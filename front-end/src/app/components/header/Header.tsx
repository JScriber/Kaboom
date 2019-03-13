import * as React from 'react';
import { AppBar, withStyles, Toolbar, IconButton, Menu, MenuItem,
  ListItemIcon, ListItemText, ButtonBase } from '@material-ui/core';

import { IProps, styles, IState } from './Header.model';
import { pathRoutes } from 'src/root.routes';
import { store } from 'src/app/redux';

// Icons.
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';

// Actions.
import { push } from 'connected-react-router';
import { logoutUser } from 'src/app/redux/user/actions/logout';

// Assets.
import logo from '../../../assets/images/logo.png';
import './Header.scss';
import { useTranslation, Trans, withTranslation } from 'react-i18next';
import { materialTranslated } from 'src/utils';

/**
 * Header component.
 * Allows the user to access his account page and the logout button.
 * When disconnected, it displays a login button which redirects to the login page.
 */
class Header extends React.Component<IProps, IState> {

  /** State initialization. */
  state: IState = {
    authentificated: false,
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

  /** Disconnects the user. */
  private disconnect = () => {
    store.dispatch(logoutUser());
    this.loginPage();

    this.handleClose();
  };

  /** Redirects to home page. */
  private homePage = () => {
    if (this.state.authentificated) {
      store.dispatch(push(pathRoutes.home));
    }
  };

  /** Redirects to login page. */
  private loginPage = () => store.dispatch(push(pathRoutes.login));

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

          { authentificated && (
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
                <ListItemText inset>
                  {this.props.t('ACCOUNT')}
                </ListItemText>
              </MenuItem>

              <MenuItem onClick={this.disconnect}>
                <ListItemIcon>
                  <ExitToAppIcon/>
                </ListItemIcon>
                <ListItemText inset primary="Déconnexion"/>
              </MenuItem>
            </Menu>
          </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

/** Export with material theme and translations. */
export default materialTranslated(Header, styles);
