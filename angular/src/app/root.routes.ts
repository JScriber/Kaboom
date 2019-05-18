import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { gameRoutes } from './pages/game/game.routes';

export const rootRoutes: Routes = [
  {
    path: '',
    redirectTo: '/game/join',
    pathMatch: 'full'
  },
  {
    path: 'game',
    children: gameRoutes
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
