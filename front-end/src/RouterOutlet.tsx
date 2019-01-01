import createBrowserHistory from 'history/createBrowserHistory';
import * as React from 'react';
import {Route, Router} from 'react-router-dom';
import {rootRoutes} from './root.routes';
import Header from './app/components/header/Header';

const history = createBrowserHistory();

export default class RouterOutlet extends React.Component {

    /** Component rendering. */
    public render(): JSX.Element {
        return (
            <Router history={history}>
                <div>
                    <Header/>
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
                </div>
            </Router>
        );
    }
}
