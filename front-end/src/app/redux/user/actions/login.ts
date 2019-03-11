import { LOGIN_USER } from '../constants';
import { User } from '../model/user.model';

export const loginUser = (payload: User) => {
  return { type: LOGIN_USER, payload };
};
