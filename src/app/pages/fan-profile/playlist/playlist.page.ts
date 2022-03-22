import { Component, OnInit } from '@angular/core';
import {
  IonRouterOutlet,
  ModalController,
  ToastController
} from '@ionic/angular';
import { AddPlaylistPage } from '../../add-playlist/add-playlist.page';
import { SharePage } from '../../share/share.page';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss']
})
export class PlaylistPage implements OnInit {
  constructor(
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    public toastController: ToastController
  ) {}

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

  async presentAddToPlaylistsToast() {
    const toast = await this.toastController.create({
      message: 'Agregado a Playlists',
      duration: 1000,
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

  ngOnInit() {}
}
