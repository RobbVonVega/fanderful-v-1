import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Playlist } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
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
  playlists: Playlist[] = [];

  constructor(
    public modalController: ModalController,
    public dataService: DataService,
    private routerOutlet: IonRouterOutlet,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getPlaylists();
    // this.username = this.authService.getId();
    // console.log(this.username)
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

  getPlaylists() {
    const path = 'playlists';
    this.dataService.getCollectionChanges<Playlist>(path).subscribe(res => {
      this.playlists = res;
    });
  }

  signOut() {
    this.authService.signOut().then(() => {
      this.router.navigateByUrl('/welcome', { replaceUrl: true });
    });
  }
}
