import * as React from 'react';
import { withStyles } from '@material-ui/core';
import * as classNames from 'classnames';

// Internal mechnism.
import RouterOutlet from '../RouterOutlet';
import { store } from './redux';

// Components.
import Header from './components/layout/header/Header';
import Drawer from './components/layout/drawer/Drawer';

// Style.
import './App.scss';

// Model.
import { IProps, IState, styles } from './App.model';

/**
 * Main component of the app.
 * Gathers the header, the drawer and the router outlet.
 * Takes care of the current location and the authentification state.
 */
class App extends React.Component<IProps, IState> {

  state: IState = {
    location: '',
    drawerOpen: true,
    authentificated: false
  };

  /** Toggles the drawer. */
  private toggleDrawer = () => this.setState(state => {
    return { drawerOpen: !state.drawerOpen };
  });

  /** Sets the drawer state. */
  private setDrawerState = (drawerOpen: boolean) => this.setState({ drawerOpen });

  /** Determines which classes to apply. */
  private contentClass = () => {
    const { classes } = this.props;

    if (this.state.drawerOpen) {
      return classNames(classes.content, classes.contentShift);
    } else {
      return classes.content;
    }
  };

  /** Handles the changes made in the store. */
  private handleStoreChanges() {
    const { authentificated, location } = this.state;

    const newLocation = this.getLocation();

    // Test if has user.
    const { username } = store.getState().userReducer;
    const hasUser = username !== undefined;

    if (authentificated && !hasUser) {
      this.setState({ authentificated: false });
    } else {
      if (!authentificated && hasUser) {
        this.setState({ authentificated: true });
      }
    }

    if (newLocation !== location) {
      this.setState({ location: newLocation });
    }
  }

  /**
   * Returns the current route location.
   * @returns {string}
   */
  private getLocation(): string {
    return store.getState().router.location.pathname;
  }

  componentDidMount() {
    // Get initial location.
    const location = this.getLocation();
    this.setState({ location });

    // Listen for store changes.
    store.subscribe(() => this.handleStoreChanges());
  }

  render() {
    const { classes } = this.props;
    const { authentificated, location } = this.state;

    return (
      <div className={classNames(classes.app, 'App')}>
        <Header
          authentificated={authentificated}
          toggleDrawer={this.toggleDrawer}
          setDrawer={this.setDrawerState}
        />

        {
          authentificated && (
            <Drawer
              location={location}
              open={this.state.drawerOpen}
            />
          )
        }

        <main className={this.contentClass()}>
          <RouterOutlet/>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);
