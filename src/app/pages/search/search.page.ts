import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonRouterOutlet,
  ModalController,
  ToastController
} from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentTMDB, Videogame } from 'src/app/interfaces/interfaces';
import { MoviesService } from 'src/app/services/movies.service';
import { VideogamesService } from 'src/app/services/videogames.service';
import { AddPlaylistPage } from '../add-playlist/add-playlist.page';
import { SharePage } from '../share/share.page';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit {
  categorias: string[] = ['Movies & TV', 'Movies', 'TV', 'Videogames'];
  categoria: string = 'Movies & TV';
  seleccion: string = this.categorias[0];
  searchResult: Observable<any>;
  searchedTMDB: ContentTMDB[] = [];
  searchedGames: Videogame[] = [];
  query: string;

  tmbdDisplay: boolean = false;
  gameDisplay: boolean = false;

  constructor(
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    public toastController: ToastController,
    private moviesService: MoviesService,
    private vgService: VideogamesService,
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

  async openPlaylistModal(content, state) {
    const modal = await this.modalController.create({
      component: AddPlaylistPage,
      cssClass: 'add-playlist-css',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        content: content,
        state: state
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

  openDetails(content: ContentTMDB, state: string) {
    this.router.navigate(['/playlists/content'], { state: { data: content, display: state } });
  }

  onSearchChange(evento) {
    console.log(evento.detail.value);
    this.query = evento.detail.value;
    this.loadContentService(this.categoria, this.query);
  }

  cambioCategoria(event) {
    this.categoria = event.detail.value;
    this.loadContentService(this.categoria, this.query);
  }

  loadContentService(categoria: string, query: string) {
    if (
      categoria == 'Movies & TV' ||
      categoria == 'Movies' ||
      categoria == 'TV'
    ) {
      this.tmbdDisplay = true;
      this.gameDisplay = false;
      
      this.loadTMDBContents(categoria, query);
    } else if (categoria == 'Videogames') {
      this.tmbdDisplay = false;
      this.gameDisplay = true;

      this.loadVGContents(query);
    }
  }

  loadTMDBContents(categoria: string, query: string) {
    if (categoria == 'Movies & TV') {
      categoria = 'multi';
    } else if (categoria == 'Movies') {
      categoria = 'movie';
    } else if (categoria == 'TV') {
      categoria = 'tv';
    }
    this.searchResult = this.moviesService.getSearchContent(categoria, query);
    if (categoria == 'multi') {
      this.searchResult.subscribe(res => {
        this.searchedTMDB = res.results.filter(content => {
          return content.media_type != 'person';
        });
        console.log(this.searchedTMDB);
      });
    } else {
      this.searchResult.subscribe(res => {
        if (categoria == 'movie') {
          this.searchedTMDB = res.results.map(item =>({
            ... item,
            media_type: 'movie'
          }));
        } else if (categoria == 'tv') {
          this.searchedTMDB = res.results.map(item =>({
            ... item,
            media_type: 'tv'
          }));
        }
      });
    }
    
    if (query == '') {
      this.searchedTMDB = [];
    }

  }

  loadVGContents(query) {
    this.searchResult = this.vgService.getSearchVG(this.query);
    this.searchResult.subscribe(res => {
      this.searchedGames = res.results;
      console.log(this.searchedGames);
    });
  }

  ngOnInit() {
    this.tmbdDisplay = true;
  }
}
