import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscoverPage } from './discover.page';

const routes: Routes = [
  {
    path: '',
    component: DiscoverPage
  },
  {
    path: 'related',
    loadChildren: () => import('./related/related.module').then( m => m.RelatedPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscoverPageRoutingModule {}
