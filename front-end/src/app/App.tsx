import * as React from 'react';
import { Theme, withStyles, WithStyles } from '@material-ui/core';
import * as classNames from 'classnames';
import RouterOutlet from '../RouterOutlet';

// Components.
import Header from './components/layout/header/Header';
import Drawer from './components/layout/drawer/Drawer';
import { drawerWidth } from './components/layout/drawer/Drawer.model';

// Style.
import './App.scss';
import { store } from './redux';

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
  authentificated: boolean;
  drawerOpen: boolean;
}

/** Main component of the app. */
class App extends React.Component<IProps, IState> {

  state: IState = {
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

  componentDidMount() {
    store.subscribe(() => {
      const { authentificated } = this.state;
      const { username } = store.getState().userReducer;
      const hasUser = username !== undefined;

      if (authentificated && !hasUser) {
        this.setState({ authentificated: false });
      } else {
        if (!authentificated && hasUser) {
          this.setState({ authentificated: true });
        }
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { authentificated } = this.state;

    return (
      <div className={classNames(classes.app, 'App')}>
        <Header
          authentificated={authentificated}
          toggleDrawer={this.toggleDrawer}
          setDrawer={this.setDrawerState}
        />

        {
          authentificated && (
            <Drawer open={this.state.drawerOpen}/>
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
