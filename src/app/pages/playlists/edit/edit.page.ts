import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ModalController } from '@ionic/angular';
import { truncate } from 'fs';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss']
})
export class EditPage implements OnInit {
  currentUser: any;
  pid;

  title = 'cloudsSorage';
  selectedFile: File = null;
  pimg;
  downloadURL: Observable<string>;

  isUploading: boolean = false;
  isUploaded: boolean = true;
  nameExists: boolean = false;
  isDisabled: boolean = true;
  constructor(
    public modalController: ModalController,
    private playlistService: PlaylistService,
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.afAuth.onAuthStateChanged(user => {
      console.log('Changed: ', user);
      this.currentUser = user;
      this.playlistService
        .getCurrentUser(this.currentUser.multiFactor.user.uid)
        .subscribe(user => {
          this.currentUser = user.data();
          console.log(this.currentUser);
        });
    });
  }

  checkNameEnable(event) {
    if (event.target.value == undefined || event.target.value == '') {
      this.nameExists = false;
      this.disableButton();
    } else {
      this.nameExists = true;
      if (this.isUploaded) {
        this.enableButton();
      }
    }
    console.log(this.isDisabled);
  }

  enableButton() {
    this.isDisabled = false;
  }

  disableButton() {
    this.isDisabled = true;
  }

  editPlaylist(name, type) {
    console.log('currentUser', this.currentUser);

    const updatedPlaylist = {
      pimg: this.pimg,
      pname: name.value,
      ptype: type.value
    };

    console.log('NewPL', updatedPlaylist);

    this.playlistService.updatePlaylistById(this.pid, updatedPlaylist);

    this.modalController.dismiss({
      dismissed: true
    });
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  onFileSelected(event) {
    this.isUploading = true;
    const aniDiv = document.getElementById('loader-overlay');
    if (this.isUploading) {
      aniDiv.style.display = 'flex';
    }

    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `PlaylistsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`PlaylistsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.pimg = url;
              this.isUploading = false;
              this.isUploaded = true;
              if (this.isUploading == false) {
                aniDiv.style.display = 'none';
              }
              if (this.nameExists) {
                this.enableButton();
              }
            }
            console.log(this.pimg);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
}
