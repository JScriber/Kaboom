import { createStore, combineReducers } from 'redux';
import { userReducer } from './user/index';

/**
 * Patches the state.
 * @param state
 * @param patch
 */
export const setState = <S, P>(state: S, patch: P) => Object.assign({}, state, patch);

/** Aggregate of reducers. */
const reducers = combineReducers({
  userReducer
});

export const store = createStore(reducers);
