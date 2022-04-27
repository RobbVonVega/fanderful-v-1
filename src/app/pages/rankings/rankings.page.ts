import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { RankedContent } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';
import { AddPlaylistPage } from '../add-playlist/add-playlist.page';
import { SharePage } from '../share/share.page';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.page.html',
  styleUrls: ['./rankings.page.scss']
})
export class RankingsPage implements OnInit {
  rankedContents: RankedContent[] = [];

  constructor(
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private dataService: DataService
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

  ngOnInit() {
    this.getContent();
  }

  getContent() {
    const path = 'rankings';
    this.dataService.getCollectionChanges<RankedContent>(path).subscribe(res => {
      this.rankedContents = res;
    });
  }
}
