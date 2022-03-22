import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FanProfilePageRoutingModule } from './fan-profile-routing.module';

import { FanProfilePage } from './fan-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FanProfilePageRoutingModule
  ],
  declarations: [FanProfilePage]
})
export class FanProfilePageModule {}
