import { AnyAction, DeepPartial } from 'redux';
import { User } from './model/user.model';
import { LOGIN_USER } from './constants';
import { setState } from '../index';

/** Initial state. */
const initialState: DeepPartial<User> = {};

/**
 * Root reducer.
 * @param state 
 * @param {AnyAction} action
 */
export const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    /** Login action. */
    case LOGIN_USER:
      console.log('Reduce action', action);
      return setState(state, {
        user: action.payload
      });

    /** Unknown action. */
    default:
      return state;
  }
};
