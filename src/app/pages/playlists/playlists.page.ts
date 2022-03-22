import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { AddPlaylistPage } from '../add-playlist/add-playlist.page';
import { SharePage } from '../share/share.page';
import { CreatePage } from './create/create.page';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss']
})
export class PlaylistsPage implements OnInit {
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

  async openCreateModal() {
    const modal = await this.modalController.create({
      component: CreatePage,
      cssClass: 'create-css',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

  ngOnInit() {}
}
