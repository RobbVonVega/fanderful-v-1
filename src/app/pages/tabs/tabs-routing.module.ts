import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'discover',
        loadChildren: () =>
          import('../discover/discover.module').then(m => m.DiscoverPageModule)
      },
      {
        path: 'search',
        loadChildren: () =>
          import('../search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'rankings',
        loadChildren: () =>
          import('../rankings/rankings.module').then(m => m.RankingsPageModule)
      },
      {
        path: 'inbox',
        loadChildren: () =>
          import('../inbox/inbox.module').then(m => m.InboxPageModule)
      },
      {
        path: 'playlists',
        loadChildren: () =>
          import('../playlists/playlists.module').then(m => m.PlaylistsPageModule)
      },
      {
        path: '',
        redirectTo: '/discover',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'app/discover',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class TabsPageRoutingModule {}
