import createBrowserHistory from "history/createBrowserHistory";
import * as React from 'react';
import {Route, Router} from 'react-router-dom'
import Game from "./component/Game";
import Login from "./component/Login";

const history = createBrowserHistory();

class Routes extends React.Component<{}, {}> {
    public render() {
        return (
            <Router history={history}>
                <div>
                    <Route path="/login" exact={true} component={Login as any}/>
                    <Route path="/game" exact={true} component={Game as any}/>
                </div>
            </Router>
        );
    }
}

export default Routes;
