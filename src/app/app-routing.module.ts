import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { AuthComponent } from './core/pages/auth/auth.component';
import { GamesComponent } from './core/pages/games/games.component';
import { ProfileComponent } from './core/pages/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full'},
  { path: 'auth', component: AuthComponent },
  { path: 'games', component: GamesComponent },
  { path: 'profile', component: ProfileComponent },
  // { path: 'friends', component: FriendsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
