import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonRouterOutlet,
  ModalController,
  NavController
} from '@ionic/angular';
import { Observable } from 'rxjs';
import {
  Videogame,
  RankedContent,
  RespuestaPopularMovies,
  ContentTMDB
} from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';
import { MoviesService } from 'src/app/services/movies.service';
import { VideogamesService } from 'src/app/services/videogames.service';
import { AddPlaylistPage } from '../add-playlist/add-playlist.page';
import { SharePage } from '../share/share.page';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.page.html',
  styleUrls: ['./rankings.page.scss']
})
export class RankingsPage implements OnInit {
  categorias: string[] = ['Movies & TV', 'Movies', 'TV', 'Videogames'];
  seleccion: string = this.categorias[0];
  rankedContents: RankedContent[] = [];
  trendResult: Observable<any>;
  trendingTMDB: ContentTMDB[] = [];
  trendingGames: Videogame[] = [];

  tmbdDisplay: boolean = false;
  gameDisplay: boolean = false;

  constructor(
    public modalController: ModalController,
    public datePipe: DatePipe,
    private routerOutlet: IonRouterOutlet,
    private dataService: DataService,
    private moviesService: MoviesService,
    private vgService: VideogamesService,
    // public navCtrl: NavController,
    public router: Router
  ) {}

  ngOnInit() {
    this.tmbdDisplay = true;
    this.loadTMDBContents(this.seleccion);
  }

  openDetails(content: ContentTMDB, state: string) {
    this.router.navigate(['/playlists/content'], { state: { data: content, display: state } });
  }

  cambioCategoria(event) {
    this.loadContentService(event.detail.value);
  }

  loadContentService(categoria: string) {
    if (
      categoria == 'Movies & TV' ||
      categoria == 'Movies' ||
      categoria == 'TV'
    ) {
      this.tmbdDisplay = true;
      this.gameDisplay = false;
      
      this.loadTMDBContents(categoria);
    } else if (categoria == 'Videogames') {
      this.tmbdDisplay = false;
      this.gameDisplay = true;

      this.loadVG();
    }
  }

  loadTMDBContents(categoria: string) {
    if (categoria == 'Movies & TV') {
      categoria = 'all';
    } else if (categoria == 'Movies') {
      categoria = 'movie';
    } else if (categoria == 'TV') {
      categoria = 'tv';
    }
    this.trendResult = this.moviesService.getTrendingMovies(categoria);
    this.trendResult.subscribe(res => {
      this.trendingTMDB = res.results.filter(content => {
        return content.media_type != 'person';
      });
      console.log(this.trendingTMDB);
    });
  }

  loadVG() {
    this.trendResult = this.vgService.getTrendingVG();
    this.trendResult.subscribe(res => {
      this.trendingGames = res.results;
      console.log(this.trendingGames);
    });
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

  // getContent() {
  //   const path = 'rankings';
  //   this.dataService
  //     .getCollectionChanges<RankedContent>(path)
  //     .subscribe(res => {
  //       this.rankedContents = res;
  //     });
  // }
}
