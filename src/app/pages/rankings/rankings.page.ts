import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonRouterOutlet,
  ModalController,
  NavController
} from '@ionic/angular';
import { Observable } from 'rxjs';
import {
  RankedContent,
  RespuestaPopularMovies,
  TrendingMovies
} from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';
import { MoviesService } from 'src/app/services/movies.service';
import { AddPlaylistPage } from '../add-playlist/add-playlist.page';
import { SharePage } from '../share/share.page';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.page.html',
  styleUrls: ['./rankings.page.scss']
})
export class RankingsPage implements OnInit {
  categorias: string[] = ['all', 'movie', 'tv'];
  seleccion: string = this.categorias[0];
  rankedContents: RankedContent[] = [];
  tmdbResult: Observable<any>;
  trendingMovies: TrendingMovies[] = [];

  constructor(
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private dataService: DataService,
    private moviesService: MoviesService,
    // public navCtrl: NavController,
    public router: Router
  ) {}

  ngOnInit() {
    this.loadMovies(this.seleccion);
  }

  openDetails(content: TrendingMovies) {
    this.router.navigate(['/playlists/content'], { state: { data: content } });
  }

  cambioCategoria(event) {
    this.loadMovies(event.detail.value);
  }

  loadMovies(categoria: string) {
    this.tmdbResult = this.moviesService.getTrendingMovies(categoria);
    this.tmdbResult.subscribe(res => {
      this.trendingMovies = res.results.filter(content => {
        return content.media_type != 'person';
      });
      console.log(this.trendingMovies);
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

  getContent() {
    const path = 'rankings';
    this.dataService
      .getCollectionChanges<RankedContent>(path)
      .subscribe(res => {
        this.rankedContents = res;
      });
  }
}
