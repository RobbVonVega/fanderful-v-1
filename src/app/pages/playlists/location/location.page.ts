import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { AddPlaylistPage } from '../../add-playlist/add-playlist.page';
import { SharePage } from '../../share/share.page';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss']
})
export class LocationPage implements OnInit {
  constructor(
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet
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

  ngOnInit() {}
}
