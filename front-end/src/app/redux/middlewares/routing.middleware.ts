import { Middleware } from 'redux';
import { LOCATION_CHANGE, push } from 'connected-react-router';
import { pathRoutes, freeRoutes } from 'src/root.routes';
import { ApiService } from 'src/app/services/api/api';
import { loginUser } from '../user/actions/login';
import { User } from '../user/model/user.model';
import i18n from 'src/translation/translation';

/** Route to get informations on the user. */
const USER_INFORMATIONS = '/player/@me';

/**
 * Tells if the given route exists.
 * @param {string} route
 * @returns {boolean}
 */
const routeExists = (route: string): boolean => {
  const locations = Object.keys(pathRoutes).map(k => pathRoutes[k]);

  return locations.indexOf(route) !== -1;
};

/**
 * Middleware which handles routing.
 * @param store - Global redux store.
 * @param next - Function to go to next stack.
 * @param action - Action to perform.
 */
export const routingMiddleware: Middleware = store => next => async action => {

  // Routes to be redirected to if no login.
  const LOGIN_PAGE = pathRoutes.login;

  // Routes to be redirected to when page unknown.
  const NOT_FOUND = pathRoutes.notFound;

  const redirect = () => store.dispatch(push(LOGIN_PAGE));
  const notFound = () => store.dispatch(push(NOT_FOUND));
  
  // Only handles action of location type.
  if (action.type === LOCATION_CHANGE) {
    const destination = action.payload.location.pathname;
    console.log('Route change to ' + destination);

    // Check if route exists.
    if (routeExists(destination)) {

      // Test if on a free route.
      if (freeRoutes.indexOf(destination) !== -1) {
        return next(action);
      }
  
      try {
        const api: ApiService = ApiService.instance();
        api.fetchToken();
  
        const user: User = await api.get<User>(USER_INFORMATIONS).toPromise();
  
        // Dispatch the updated user.
        store.dispatch(loginUser({
          username: user.username,
          email: user.email,
          language: user.language
        }));

        // Set language.
        i18n.changeLanguage(user.language);
  
        return next(action);
      } catch (e) {
        redirect();
      }
    } else {
      notFound();
    }
  } else {
    return next(action);
  }
}
