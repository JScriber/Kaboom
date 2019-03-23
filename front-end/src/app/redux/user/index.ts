import { AnyAction, DeepPartial } from 'redux';
import { User } from './model/user.model';
import { LOGIN_USER, LOGOUT_USER } from './constants';
import { setState } from '../index';
import { ApiService } from 'src/app/services/api/api';

/** Initial state. */
const initialState: DeepPartial<User> = {};

/**
 * Root reducer.
 * @param state 
 * @param {AnyAction} action
 */
export const userReducer = (state = initialState, { type, payload }: AnyAction) => {
  const api: ApiService = ApiService.instance();

  switch (type) {
    /** Login action. */
    case LOGIN_USER:
      return setState(state, payload);

    /** Logout action. */
    case LOGOUT_USER:
      api.deleteToken();

      return setState(state, payload);

    /** Unknown action. */
    default:
      return state;
  }
};
