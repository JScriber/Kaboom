import * as React from 'react';
import './App.scss';
import * as classNames from 'classnames';
import RouterOutlet from '../RouterOutlet';

// Components.
import Header from './components/header/Header';
import Drawer from './components/drawer/Drawer';

import { Theme, withStyles, WithStyles } from '@material-ui/core';
import { drawerWidth } from './components/drawer/Drawer.model';

const styles = (theme: Theme) => ({
  app: {
    display: 'flex',
    backgroundColor: theme.palette.background.default,
  },
  content: {
    flexGrow: 1,
    padding: 10,
    paddingTop: 80,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

interface IProps extends WithStyles<typeof styles> {}

interface IState {
  drawerOpen: boolean;
}

/** Main component of the app. */
class App extends React.Component<IProps, IState> {

  state: IState = {
    drawerOpen: true
  };

  /** Toggles the drawer. */
  private toggleDrawer = () => this.setState(state => {
    return { drawerOpen: !state.drawerOpen };
  });

  /** Determines which classes to apply. */
  private contentClass = () => {
    const { classes } = this.props;

    if (this.state.drawerOpen) {
      return classNames(classes.content, classes.contentShift);
    } else {
      return classes.content;
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classNames(classes.app, 'App')}>
        <Header toggleDrawer={this.toggleDrawer}/>
        <Drawer open={this.state.drawerOpen}/>

        <main className={this.contentClass()}>
          <RouterOutlet/>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);
