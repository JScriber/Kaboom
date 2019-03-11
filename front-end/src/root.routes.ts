import { RouteProps } from 'react-router';

import LoginComponent from './app/components/login/LoginComponent';
import Game from './app/components/game/Game';
import SigninComponent from './app/components/signin/SigninComponent';
import MenuComponent from './app/components/home/Home';
import ServerListComponent from './app/components/serverlist/ServerList';
import CreateServer from './app/components/create-server/CreateServer';
import TestComponent from './app/components/test/Test';

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
    path: '/home',
    exact: true,
    component: MenuComponent
  },
  {
    path: '/server/list',
    exact: true,
    component: ServerListComponent
  },
  {
    path: '/server/create',
    exact: true,
    component: CreateServer
  },
  {
    path: '/test',
    exact: true,
    component: TestComponent
  }
];
