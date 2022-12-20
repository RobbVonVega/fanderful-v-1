import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import {
  AlertController,
  IonRouterOutlet,
  ModalController,
  ToastController
} from '@ionic/angular';
import { Playlist } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PlaylistService } from 'src/app/services/playlist.service';
import { AddPlaylistPage } from '../add-playlist/add-playlist.page';
import { SharePage } from '../share/share.page';
import { CreatePage } from './create/create.page';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss']
})
export class PlaylistsPage implements OnInit {
  username: any = null;
  userimg: any = null;
  userUId: any = null;
  playlists: any;
  currentUser: any;

  isUploading: boolean = false;
  downloadURL: Observable<string>;

  constructor(
    public modalController: ModalController,
    public dataService: DataService,
    private routerOutlet: IonRouterOutlet,
    private router: Router,
    private authService: AuthService,
    public playlistService: PlaylistService,
    public userService: UserService,
    public toastController: ToastController,
    private afAuth: AngularFireAuth,
    public alertController: AlertController,
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
          this.userUId = this.currentUser.uid;
          this.username = this.currentUser.username;
          this.userimg = this.currentUser.img;
          console.log(this.currentUser);
          this.getPlaylists();
        });
    });
  }

  onFileSelected(event) {
    this.isUploading = true;
    const aniDiv = document.getElementById('animation');
    if(this.isUploading){
      aniDiv.style.display = 'flex';
    }

    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `UserProfileImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`UserProfileImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.userimg = url;
              this.uploadProfilePicture();
              this.presentChangeProfilePictureToast()
              this.isUploading = false;
              if(this.isUploading == false){
                aniDiv.style.display = 'none';
              }  
            }
            console.log(this.userimg);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  uploadProfilePicture(){
    console.log('currentUser', this.currentUser);

    const newProfilePicture = {
      img: this.userimg
    }

    this.userService.updateProfilePicture(this.userUId, newProfilePicture);
  }

  openDetails(content: Playlist) {
    this.router.navigate(['/playlists/playlist'], { state: { data: content } });
  }

  async openShareModal() {
    const modal = await this.modalController.create({
      component: SharePage,
      cssClass: 'share-css',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

  async openPlaylistModal() {
    const modal = await this.modalController.create({
      component: AddPlaylistPage,
      cssClass: 'add-playlist-css',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

  async openCreateModal() {
    const modal = await this.modalController.create({
      component: CreatePage,
      cssClass: 'create-css',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

  async presentDeleteAlert(pid) {
    const alert = await this.alertController.create({
      cssClass: 'delete-alert',
      header: 'Eliminar Playlist',
      message: '¿Estás seguro de eliminar esta playlist?',
      inputs: [
        {
          name: 'pid',
          value: pid
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Eliminar',
          id: 'confirm-button',
          handler: data => {
            this.deletePlaylist(data.pid);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentChangeProfilePictureToast() {
    const toast = await this.toastController.create({
      message: 'Foto de perfil actualizada',
      duration: 3000,
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }


  getPlaylists() {
    const path = 'playlists';
    // this.dataService.getCollectionChanges<Playlist>(path).subscribe(res => {
    //   this.playlists = res;
    // });

    const collectionRef = this.playlistService.getPlaylistByUserId(
      this.currentUser.uid
    );

    collectionRef.valueChanges().subscribe(data => {
      this.playlists = data;
    });

    console.log('pl', this.playlists);
  }

  deletePlaylist(pid) {
    this.playlistService.deletePlaylistByPId(pid);
  }

  signOut() {
    this.authService.signOut().then(() => {
      this.router.navigateByUrl('/welcome', { replaceUrl: true });
    });
  }
}
