import * as React from 'react';
import { AppBar, withStyles, Toolbar, IconButton, Menu, MenuItem,
  ListItemIcon, ListItemText, ButtonBase } from '@material-ui/core';

import { IProps, styles, IState } from './Header.model';
import { pathRoutes } from 'src/root.routes';
import { store } from 'src/app/redux';

// Icons.
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AccountCircle from '@material-ui/icons/AccountCircle';

// Actions.
import { push } from 'connected-react-router';
import { logoutUser } from 'src/app/redux/user/actions/logout';

// Assets.
import logo from '../../../assets/images/logo.png';
import './Header.scss';

/**
 * Header component.
 * Allows the user to access his account page and the logout button.
 * When disconnected, it displays a login button which redirects to the login page.
 */
class Header extends React.Component<IProps, IState> {

  /** State initialization. */
  state: IState = {
    authentificated: true,
    anchorEl: null,
  };

  handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  componentDidMount() {
    store.subscribe(() => {
      const { authentificated } = this.state;
      const { username } = store.getState().userReducer;
      const hasUser = typeof username !== undefined;

      if (authentificated && !hasUser) {
        this.setState({ authentificated: false });
      } else {
        if (!authentificated && hasUser) {
          this.setState({ authentificated: true });
        }
      }
    });
  }

  /** Disconnects the user. */
  private disconnect = () => {
    store.dispatch(logoutUser());
    this.handleClose();
  };

  /** Redirects to home page. */
  private homePage = () => {
    if (this.state.authentificated) {
      store.dispatch(push(pathRoutes.home));
    }
  };

  public render() {
    const { classes } = this.props;
    const { authentificated } = this.state;
    const open = Boolean(this.state.anchorEl);

    return (
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <ButtonBase focusRipple onClick={this.homePage}>
            <img className='kaboom-logo' src={logo} alt='KABOOM logo bomb'/>
          </ButtonBase>

          <span className={classes.grow}></span>

          { authentificated ? (
          <React.Fragment>
            <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <Menu id="menu-appbar"
              anchorEl={this.state.anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}>
              <MenuItem>
                <ListItemIcon>
                  <SettingsIcon/>
                </ListItemIcon>
                <ListItemText inset primary="Compte"/>
              </MenuItem>

              <MenuItem onClick={this.disconnect}>
                <ListItemIcon>
                  <ExitToAppIcon/>
                </ListItemIcon>
                <ListItemText inset primary="Déconnexion"/>
              </MenuItem>
            </Menu>
          </React.Fragment>
          ) : (
            <IconButton color="inherit" onClick={() => store.dispatch(push(pathRoutes.login))}>
              <AssignmentIndIcon/>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

/** Export with material theme. */
export default withStyles(styles, {
  withTheme: true
})(Header);
