import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { contestRoutes } from './pages/contest/contest.routes';

import { SignInComponent } from './pages/authentification/sign-in/sign-in.component';
import { SignUpComponent } from './pages/authentification/sign-up/sign-up.component';

import { AuthGuardService } from './web-service/auth-guard.service';
import { AccountComponent } from './pages/account/components/account/account.component';

export const rootRoutes: Routes = [
  {
    path: '',
    redirectTo: '/game/join',
    pathMatch: 'full'
  },
  {
    path: 'game',
    children: contestRoutes,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    data: { minimized: true }
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    data: { minimized: true }
  },
  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [ AuthGuardService ]
  }
];
