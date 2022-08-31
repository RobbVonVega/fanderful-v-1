import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController, ToastController } from '@ionic/angular';
import { PlaylistContent, Playlist, TrendingMovies } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';
import { AddPlaylistPage } from '../../add-playlist/add-playlist.page';
import { SharePage } from '../../share/share.page';
import { CreatePage } from '../create/create.page';
import { EditPage } from '../edit/edit.page';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss']
})
export class PlaylistPage implements OnInit {
  contents: PlaylistContent[];
  playlist: Playlist;

  constructor(
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    public toastController: ToastController,
    private dataService: DataService,
    public router: Router,
  ) {
    if (router.getCurrentNavigation().extras.state) {
      const { data } = router.getCurrentNavigation().extras.state;
      this.playlist = data;
      console.log(this.playlist);

      this.contents = this.playlist.pcontent;

      console.log(this.contents[0])
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

  async openCreateModal() {
    const modal = await this.modalController.create({
      component: CreatePage,
      cssClass: 'create-css',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

  async openEditModal() {
    const modal = await this.modalController.create({
      component: EditPage,
      cssClass: 'create-css',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { 
        pid: this.playlist.pid,
        pimg: this.playlist.pimg,
      }
    });
    return await modal.present();
  }

  openDetails(content: TrendingMovies) {
    this.router.navigate(['/playlists/content'], { state: { data: content } });
  }

  ngOnInit() {
    // this.getContent();
  }

  // getContent() {
  //   const path = 'playlists/0gO7eR3pdJzecvPkIqwC/content';
  //   this.dataService.getCollectionChanges<Content>(path).subscribe(res => {
  //     this.contents = res;
  //   });
  // }
}
