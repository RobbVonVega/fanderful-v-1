import { Component, OnInit } from '@angular/core';
import Swiper, {SwiperOptions, Pagination } from 'swiper';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  constructor() { }

  ngOnInit() {
    Swiper.use([Pagination])
  }

}
