import { LOGOUT_USER } from '../constants';

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
    payload: {
      username: undefined,
      token: undefined
    }
  };
};
