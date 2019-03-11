import * as React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './app/redux';

import { rootRoutes } from './root.routes';
import Header from './app/components/header/Header';

export default class RouterOutlet extends React.Component {

  /** Component rendering. */
  render(): JSX.Element {
    return (
      <ConnectedRouter history={history}>
        <React.Fragment>
          <Header/>

          <Switch>
            {
              rootRoutes.map((route, i) => (
                <Route
                  key={i}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}/>
              ))
            }
          </Switch>
        </React.Fragment>
      </ConnectedRouter>
    );
  }
}
