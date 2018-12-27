import createBrowserHistory from 'history/createBrowserHistory';
import * as React from 'react';
import { Route, Router} from 'react-router-dom';
import { rootRoutes } from './root.routes';

const history = createBrowserHistory();

export default class RouterOutlet extends React.Component {

  /** Component rendering. */
  public render(): JSX.Element {
    return (
      <Router history={history}>
        <div className='router-outlet'>
          {
            rootRoutes.map((route, i) => (
              <Route
                key={i}
                path={route.path}
                exact={route.exact}
                component={route.component}/>
            ))
          }
        </div>
      </Router>
    );
  }
}
