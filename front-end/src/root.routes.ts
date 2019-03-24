import { RouteProps } from 'react-router';

import Login from './app/components/pages/login/Login';
import Game from './app/components/pages/game/Game';
import JoinServer from './app/components/pages/join-server/JoinServer';
import CreateServer from './app/components/pages/create-server/CreateServer';
import TestComponent from './app/components/pages/test/Test';
import NotFoundComponent from './app/components/pages/not-found/NotFound';
import Profile from './app/components/pages/profile/Profile';
import SignUp from './app/components/pages/sign-up/SignUp';

/** All known routes. */
export const pathRoutes = {
  notFound: '/not-found',
  home: '/',
  login: '/login',
  game: '/game',
  levelEditor: '/level-editor',
  stats: '/stats',
  signUp: '/sign-up',
  serverCreate: '/server/create',
  profile: '/profile',
  informations: '/informations'
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
    component: JoinServer
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
