import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonRouterOutlet,
  ModalController,
  ToastController
} from '@ionic/angular';
import { Observable } from 'rxjs';
import { TrendingMovies } from 'src/app/interfaces/interfaces';
import { MoviesService } from 'src/app/services/movies.service';
import { AddPlaylistPage } from '../add-playlist/add-playlist.page';
import { SharePage } from '../share/share.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit {
  categorias: string[] = ['multi', 'movie', 'tv'];
  seleccion: string = this.categorias[0];
  tmdbResult: Observable<any>;
  searchedContent: TrendingMovies[] = [];
  query: string;

  constructor(
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    public toastController: ToastController,
    private moviesService: MoviesService,
    public router: Router
  ) {}

  async openShareModal(content) {
    const modal = await this.modalController.create({
      component: SharePage,
      cssClass: 'share-css',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        content: content
      }
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

  openDetails(content: TrendingMovies) {
    this.router.navigate(['/playlists/content'], { state: { data: content } });
  }

  onSearchChange(evento) {
    console.log(evento.detail.value);
    this.query = evento.detail.value;
    this.loadContents(this.seleccion, this.query);
    // if(this.query = ''){
    //   this.searchedContent = [];
    // } else {
    //   this.loadContents(this.seleccion, this.query);
    // }
  }

  loadContents(categoria: string, query: string) {
    this.tmdbResult = this.moviesService.getSearchContent(categoria, query);
    this.tmdbResult.subscribe(res => {
      this.searchedContent = res.results.filter(content => {
        return content.media_type != 'person';
      });
    });
    if (query == '') {
      this.searchedContent = [];
    }

    // this.searchedContent = this.searchedContent.filter(content => {
    //   return content.media_type != 'person';
    // });
  }

  ngOnInit() {}
}
