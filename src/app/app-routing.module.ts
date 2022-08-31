import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/']);

const redirectLoggedInToApp = () => redirectLoggedInTo(['/tabs']);

const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
      // ...canActivate(redirectLoggedInToApp)
  },
  {
    path: 'discover',
    loadChildren: () =>
      import('./pages/discover/discover.module').then(m => m.DiscoverPageModule),
      // ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'rankings',
    loadChildren: () =>
      import('./pages/rankings/rankings.module').then(m => m.RankingsPageModule)
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./pages/search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'inbox',
    loadChildren: () =>
      import('./pages/inbox/inbox.module').then(m => m.InboxPageModule)
  },
  {
    path: 'playlists',
    loadChildren: () =>
      import('./pages/playlists/playlists.module').then(
        m => m.PlaylistsPageModule
      )
  },
  {
    path: 'share',
    loadChildren: () =>
      import('./pages/share/share.module').then(m => m.SharePageModule)
  },
  {
    path: 'add-playlist',
    loadChildren: () =>
      import('./pages/add-playlist/add-playlist.module').then(
        m => m.AddPlaylistPageModule
      )
  },
  {
    path: 'fan-profile',
    loadChildren: () =>
      import('./pages/fan-profile/fan-profile.module').then(
        m => m.FanProfilePageModule
      )
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
