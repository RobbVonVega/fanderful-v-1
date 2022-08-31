import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { Playlist } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { AddPlaylistPage } from '../add-playlist/add-playlist.page';
import { SharePage } from '../share/share.page';
import { CreatePage } from './create/create.page';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss']
})
export class PlaylistsPage implements OnInit {
  username: any = null;
  userimg: any = null;
  playlists: any;
  currentUser: any;

  constructor(
    public modalController: ModalController,
    public dataService: DataService,
    private routerOutlet: IonRouterOutlet,
    private router: Router,
    private authService: AuthService,
    public playlistService: PlaylistService,
    private afAuth: AngularFireAuth,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.afAuth.onAuthStateChanged(user => {
      console.log('Changed: ', user);
      this.currentUser = user;
      this.playlistService
        .getCurrentUser(this.currentUser.multiFactor.user.uid)
        .subscribe(user => {
          this.currentUser = user.data();
          this.username = this.currentUser.username;
          this.userimg = this.currentUser.img;
          console.log(this.currentUser);
          this.getPlaylists();
        });
    });
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
          value: pid,
        },
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
        }, {
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
