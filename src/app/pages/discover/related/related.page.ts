import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController, Platform } from '@ionic/angular';
import { AddPlaylistPage } from '../../add-playlist/add-playlist.page';
import { SharePage } from '../../share/share.page';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-related',
  templateUrl: './related.page.html',
  styleUrls: ['./related.page.scss']
})
export class RelatedPage implements OnInit {
  article: any;

  constructor(
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    public router: Router,
    private iab: InAppBrowser,
    private platform: Platform
  ) {
    if (router.getCurrentNavigation().extras.state) {
      const { data } = router.getCurrentNavigation().extras.state;
      this.article = data;
      console.log(this.article);
    }
  }

  openArticle() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      const browser = this.iab.create(this.article.url, '_system');
      browser.show();
      return;
    }
    // console.log('URL: ', this.noticiaDetalle.url);
    window.open(this.article.url, '_blank');
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

  ngOnInit() {}
}
