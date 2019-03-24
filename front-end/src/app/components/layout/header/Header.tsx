import * as React from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem,
  ListItemIcon, ListItemText, ButtonBase, Tooltip } from '@material-ui/core';

import { Language, languages } from 'src/translation/translation';
import { IProps, styles, IState } from './Header.model';
import { pathRoutes } from 'src/root.routes';
import { store } from 'src/app/redux';

// Icons.
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TranslateIcon from '@material-ui/icons/Translate';

// Actions.
import { push } from 'connected-react-router';
import { logoutUser } from 'src/app/redux/user/actions/logout';

// Assets.
import logo from '../../../../assets/images/logo.png';
import './Header.scss';
import { materialTranslated } from 'src/utils';

/**
 * Header component.
 * Allows the user to access his account page and the logout button.
 * When disconnected, it displays a login button which redirects to the login page.
 */
class Header extends React.Component<IProps, IState> {

  /** State initialization. */
  state: IState = {
    anchorEl: null
  };

  handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  /** Disconnects the user. */
  private disconnect = () => {
    store.dispatch(logoutUser());
    this.loginPage();

    this.handleClose();
  };

  /** Redirects to home page. */
  private homePage = () => {
    if (this.props.authentificated) {
      store.dispatch(push(pathRoutes.home));
    }
  };

  /** Redirects to login page. */
  private loginPage = () => store.dispatch(push(pathRoutes.login));

  /** Redirects to profile page. */
  private profilePage = () => {
    store.dispatch(push(pathRoutes.profile));
    this.handleClose();
  };

  /**
   * Changes used language.
   * @param {Language} language
   */
  private translate = (language: Language) => () => {
    this.props.i18n.changeLanguage(language);
    this.handleClose();
  };

  public render() {
    const { toggleDrawer, authentificated, classes } = this.props;
    const open = Boolean(this.state.anchorEl);

    return (
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          { authentificated && (
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={toggleDrawer}
                className={classes.menuButton}
              >
                <MenuIcon/>
              </IconButton>
            )
          }

          <ButtonBase focusRipple onClick={this.homePage}>
            <img className='kaboom-logo' src={logo} alt='KABOOM logo'/>
          </ButtonBase>

          <span className={classes.grow}></span>

          { authentificated ? (
          <React.Fragment>
            <Tooltip title={this.props.t('HEADER.ACCOUNT')} aria-label="Account">
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>

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
              <MenuItem onClick={this.profilePage}>
                <ListItemIcon>
                  <SettingsIcon/>
                </ListItemIcon>
                <ListItemText inset>
                  {this.props.t('HEADER.ACCOUNT')}
                </ListItemText>
              </MenuItem>

              <MenuItem onClick={this.disconnect}>
                <ListItemIcon>
                  <ExitToAppIcon/>
                </ListItemIcon>
                <ListItemText inset>
                  {this.props.t('HEADER.DECONNECTION')}
                </ListItemText>
              </MenuItem>
            </Menu>
          </React.Fragment>
          ): (
          <React.Fragment>
            <Tooltip title={this.props.t('HEADER.LANGUAGE')} aria-label="Language">
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <TranslateIcon />
              </IconButton>
            </Tooltip>

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
              {
                languages.map((language, i) => (
                  <MenuItem key={i} onClick={this.translate(language.language)}>
                    {this.props.t(language.name)}
                  </MenuItem>
                ))
              }
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
