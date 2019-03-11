import { RouteProps } from 'react-router';

import LoginComponent from './app/components/login/LoginComponent';
import Game from './app/components/game/Game';
import SigninComponent from './app/components/signin/SigninComponent';
import MenuComponent from './app/components/home/Home';
import ServerListComponent from './app/components/serverlist/ServerList';
import CreateServer from './app/components/create-server/CreateServer';
import TestComponent from './app/components/test/Test';
import NotFoundComponent from './app/components/not-found/NotFound';

/** All known routes. */
export const pathRoutes = {
  notFound: '/not-found',
  home: '/',
  login: '/login',
  game: '/game',
  signin: '/signin',
  serverList: '/server/list',
  serverCreate: '/server/create'
};

/** Routes where authentification isn't required. */
export const freeRoutes = [
  pathRoutes.login,
  pathRoutes.signin,
  pathRoutes.notFound
];

/** Routes associated to their component. */
export const rootRoutes: RouteProps[] = [
  {
    path: pathRoutes.notFound,
    exact: true,
    component: NotFoundComponent
  },
  {
    path: pathRoutes.home,
    exact: true,
    component: MenuComponent
  },
  {
    path: pathRoutes.login,
    exact: true,
    component: LoginComponent
  },
  {
    path: pathRoutes.game,
    exact: true,
    component: Game
  },
  {
    path: pathRoutes.signin,
    exact: true,
    component: SigninComponent
  },
  {
    path: pathRoutes.serverList,
    exact: true,
    component: ServerListComponent
  },
  {
    path: pathRoutes.serverCreate,
    exact: true,
    component: CreateServer
  },
  // TODO: Remove after tests.
  {
    path: '/test',
    exact: true,
    component: TestComponent
  }
];
