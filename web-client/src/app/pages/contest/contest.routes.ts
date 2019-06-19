import { Routes } from '@angular/router';

import { GameComponent } from '../../game/game/game.component';

import { CreateContestComponent } from './components/create-contest/create-contest.component';
import { ListContestComponent } from './components/list-contest/list-contest.component';
import { JoinContestComponent } from './components/join-contest/join-contest.component';

export const contestRoutes: Routes = [
  {
    path: '',
    component: GameComponent,
    pathMatch: 'full'
  },
  {
    path: 'join',
    component: ListContestComponent
  },
  {
    path: 'create',
    component: CreateContestComponent
  },
  {
    path: 'join/:uuid',
    component: JoinContestComponent
  }
];
