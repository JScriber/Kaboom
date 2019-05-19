import { Routes } from '@angular/router';
import { JoinGameComponent } from './join-game/join-game/join-game.component';
import { CreateGameComponent } from './create-game/create-game/create-game.component';
import { GameComponent } from '../../game/game/game.component';

export const gameRoutes: Routes = [
  {
    path: '',
    component: GameComponent,
    pathMatch: 'full'
  },
  {
    path: 'join',
    component: JoinGameComponent
  },
  {
    path: 'create',
    component: CreateGameComponent
  }
];
