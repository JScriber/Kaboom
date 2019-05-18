import { Routes } from '@angular/router';
import { PlayGameComponent } from './play-game/play-game/play-game.component';
import { JoinGameComponent } from './join-game/join-game/join-game.component';
import { CreateGameComponent } from './create-game/create-game/create-game.component';

export const gameRoutes: Routes = [
  {
    path: '',
    component: PlayGameComponent
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
