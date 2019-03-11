import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router'

import { userReducer } from './user/index';
import { routingMiddleware } from './middlewares/routing.middleware';

/**
 * Patches the state.
 * @param state
 * @param patch
 */
export const setState = <S, P>(state: S, patch: P) => Object.assign({}, state, patch);

/** Routing history. */
export const history = createBrowserHistory();

/** Aggregate of reducers. */
const reducers = combineReducers({
  userReducer,
  router: connectRouter(history)
});

/** Global redux store. */
export const store = createStore(reducers, {}, compose(
  applyMiddleware(
    routerMiddleware(history),
    routingMiddleware
  )
));
