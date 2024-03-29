import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss']
})
export class CreatePage implements OnInit {
  currentUser: any;

  title = 'cloudsSorage';
  selectedFile: File = null;
  pimg;
  downloadURL: Observable<string>;

  isUploading: boolean = false;
  isUploaded: boolean = false;
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
      if(this.isUploaded){
        this.enableButton();
      }
    }
    console.log(this.isDisabled);
  }

  enableButton(){
    this.isDisabled = false;
  }

  disableButton(){
    this.isDisabled = true;
  }

  createPlaylist(name, type) {
    console.log('currentUser', this.currentUser);

    if (this.pimg == undefined) {
      this.pimg = 'assets/img/not-found.png';
    }

    if (type == undefined || type == '' || type == 'Todo') {
      type = 'General';
    }

    const newPlaylist = {
      pimg: this.pimg,
      pname: name.value,
      ptype: type.value,
      puser: this.currentUser.username,
      puserid: this.currentUser.uid,
      pcontent: []
    };

    console.log('NewPL', newPlaylist);

    this.playlistService.handleDoc('', newPlaylist);

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
