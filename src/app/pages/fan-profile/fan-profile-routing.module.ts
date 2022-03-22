import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FanProfilePage } from './fan-profile.page';

const routes: Routes = [
  {
    path: '',
    component: FanProfilePage
  },
  {
    path: 'playlist',
    loadChildren: () => import('./playlist/playlist.module').then( m => m.PlaylistPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FanProfilePageRoutingModule {}
