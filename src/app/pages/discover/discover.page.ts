import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';
import Swiper, { SwiperOptions, Pagination } from 'swiper';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss']
})
export class DiscoverPage implements OnInit {
  noticias: Article[] = [];

  constructor(
    private noticiasService: NoticiasService,
    public nav: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    Swiper.use([Pagination]);
    this.noticiasService.getNoticias().subscribe(res => {
      this.noticias = res.articles;
    });
  }

  pushToNextScreenWithParams(pageUrl: string, params: any) {
    this.nav.navigateForward(pageUrl, { state: params });
  }

  goToRelated(obj) {
    this.router.navigate(["/app/app/discover/related"], {state: { data: obj}})
  }
}
