import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatedPage } from './related.page';

const routes: Routes = [
  {
    path: '',
    component: RelatedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatedPageRoutingModule {}
