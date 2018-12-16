import { RouteProps } from 'react-router';

import Login from './app/components/login/Login';
import Game from './app/components/game/Game';
import Signin from "./app/components/signin/Signin";

export const rootRoutes: RouteProps[] = [
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: '/game',
    exact: true,
    component: Game
  },
  {
    path: '/signin',
    exact: true,
    component: Signin
  }
];
