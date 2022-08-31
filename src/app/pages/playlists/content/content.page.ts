import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { TrendingMovies } from 'src/app/interfaces/interfaces';
import { AddPlaylistPage } from '../../add-playlist/add-playlist.page';
import { SharePage } from '../../share/share.page';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss']
})
export class ContentPage implements OnInit {
  content: TrendingMovies;

  constructor(
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    public router: Router,
  ) {
    if (router.getCurrentNavigation().extras.state) {
      const { data } = router.getCurrentNavigation().extras.state;
      this.content = data;
      console.log(this.content);
    }
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

  async openPlaylistModal(content) {
    const modal = await this.modalController.create({
      component: AddPlaylistPage,
      cssClass: 'add-playlist-css',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        content: content
      }
    });
    return await modal.present();
  }

  ngOnInit() {}
}
