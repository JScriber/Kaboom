import { RouteProps } from 'react-router';

import LoginComponent from './app/components/login/LoginComponent';
import Game from './app/components/game/Game';
import SigninComponent from './app/components/signin/SigninComponent';
import MenuComponent from './app/components/menu/Menu';

export const rootRoutes: RouteProps[] = [
  {
    path: '/login',
    exact: true,
    component: LoginComponent
  },
  {
    path: '/game',
    exact: true,
    component: Game
  },
  {
    path: '/signin',
    exact: true,
    component: SigninComponent
  },
  {
    path: '/menu',
    exact: true,
    component: MenuComponent
  }

];
