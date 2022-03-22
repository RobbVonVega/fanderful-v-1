import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscoverPageRoutingModule } from './discover-routing.module';

import { DiscoverPage } from './discover.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscoverPageRoutingModule,
    SwiperModule
  ],
  declarations: [DiscoverPage]
})
export class DiscoverPageModule {}
