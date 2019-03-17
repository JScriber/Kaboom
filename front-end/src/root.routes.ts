import { RouteProps } from 'react-router';

import Login from './app/components/login/Login';
import Game from './app/components/game/Game';
import MenuComponent from './app/components/home/Home';
import ServerListComponent from './app/components/serverlist/ServerList';
import CreateServer from './app/components/create-server/CreateServer';
import TestComponent from './app/components/test/Test';
import NotFoundComponent from './app/components/not-found/NotFound';
import Profile from './app/components/profile/Profile';
import SignUp from './app/components/sign-up/SignUp';

/** All known routes. */
export const pathRoutes = {
  notFound: '/not-found',
  home: '/',
  login: '/login',
  game: '/game',
  signUp: '/sign-up',
  serverList: '/server/list',
  serverCreate: '/server/create',
  profile: '/profile'
};

/** Routes where authentification isn't required. */
export const freeRoutes = [
  pathRoutes.login,
  pathRoutes.signUp,
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
    component: Login
  },
  {
    path: pathRoutes.game,
    exact: true,
    component: Game
  },
  {
    path: pathRoutes.signUp,
    exact: true,
    component: SignUp
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
  {
    path: pathRoutes.profile,
    exact: true,
    component: Profile
  },
  // TODO: Remove after tests.
  {
    path: '/test',
    exact: true,
    component: TestComponent
  }
];
