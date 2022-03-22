import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatedPageRoutingModule } from './related-routing.module';

import { RelatedPage } from './related.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelatedPageRoutingModule
  ],
  declarations: [RelatedPage]
})
export class RelatedPageModule {}
