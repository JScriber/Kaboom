import * as React from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem,
  ListItemIcon, ListItemText, ButtonBase, Tooltip } from '@material-ui/core';

import { IProps, styles, IState } from './Header.model';
import { pathRoutes } from 'src/root.routes';
import { store } from 'src/app/redux';

// Icons.
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TranslateIcon from '@material-ui/icons/Translate';

// Actions.
import { push } from 'connected-react-router';
import { logoutUser } from 'src/app/redux/user/actions/logout';

// Assets.
import logo from '../../../assets/images/logo.png';
import './Header.scss';
import { materialTranslated } from 'src/utils';
import { Language, languages } from 'src/translation/translation';

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

  /** Redirects to profile page. */
  private profilePage = () => {
    store.dispatch(push(pathRoutes.profile));
    this.handleClose();
  }

  /**
   * Changes used language.
   * @param {Language} language
   */
  private translate = (language: Language) => () => {
    this.props.i18n.changeLanguage(language);
    this.handleClose();
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
                languages.map(language => (
                  <MenuItem onClick={this.translate(language.language)}>
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
