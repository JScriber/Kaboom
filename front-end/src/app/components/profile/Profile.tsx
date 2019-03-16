import * as React from 'react';
import { CardContent, Card, CardHeader, IconButton, TextField, MenuItem,
  Menu, ListItemIcon, ListItemText, Divider, LinearProgress } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SecurityIcon from '@material-ui/icons/Security';
import DeleteIcon from '@material-ui/icons/DeleteForever';

// System-wide.
import { Language, languages } from 'src/translation/translation';
import { materialTranslated } from 'src/utils';

// Model.
import { IProps, IState, Form, styles } from './Profile.model';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { store } from 'src/app/redux';

/** Time before the informations get sent (in miliseconds). */
const FORM_TIMEOUT = 800;

/**
 * Component used to create a server.
 * Acts as an orchestrator.
 */
class Profile extends React.Component<IProps, IState> {

  /** State initialization. */
  state: IState = {
    anchorEl: null,
    loading: true,
    form: {
      username: '',
      email: '',
      language: Language.English
    }
  };

  /** Form timeout. */
  private timeout: NodeJS.Timeout;

  private handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private handleClose = () => this.setState({ anchorEl: null });

  /**
   * Handles form value change.
   * @param key
   */
  private handleChange = (key: keyof(Form)) => (event: React.FormEvent) => {
    const value = (event.target as HTMLInputElement).value;

    this.setState(({ form }: IState) => {
      form[key] = value;

      return { form };
    });
  };

  /** Handles language changes. */
  private handleLanguage = (event: React.FormEvent) => {
    this.handleChange('language')(event);
    const language: Language = (event.target as HTMLInputElement).value as Language;

    // Magic hack. DON'T TOUCH.
    this.props.i18n.changeLanguage(language, () => {
      const time: NodeJS.Timeout = setTimeout(() => this.props.i18n
        .changeLanguage(language) && clearTimeout(time), 50);
    });

    // Apply changes.
    this.sendInformations();
  };

  /**
   * Handle form value change with timeout.
   * @param key
   */
  private handleTimeoutChange = (key: keyof(Form)) => (event: React.FormEvent) => {
    const value = (event.target as HTMLInputElement).value;

    this.setState(({ form }: IState) => {
      const oldValue = form[key];
      form[key] = value;

      if (oldValue !== value) this.updateTimeout();

      return { form };
    });
  };

  /** Updates the timeout. */
  private updateTimeout() {
    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(this.sendInformations, FORM_TIMEOUT);
  };

  /** Sends user informations to back-end. */
  private sendInformations = () => {
    this.setState({ loading: true });
    const { form } = this.state;

    interval(1000).pipe(take(1)).subscribe(() => {
      console.log(form);
      this.setState({ loading: false });
    })
  };

  componentDidMount() {
    // TODO: Fetch informations from redux.

    this.setState({
      loading: false,
      form: {
        username: 'Kaboom',
        email: 'anthony@gmail.com',
        language: Language.French
      }
    });
  }

  render() {
    const { classes, t } = this.props;
    const { form, loading } = this.state;
    const open = Boolean(this.state.anchorEl);

    return (
      <React.Fragment>
        <Card className={classes.card}>
          { loading && <LinearProgress/> }
          <CardHeader
            action={
              <React.Fragment>
                <IconButton
                  aria-owns={open ? 'menu-profile' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                >
                  <MoreVertIcon/>
                </IconButton>

                <Menu id="menu-profile"
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
                      <SecurityIcon/>
                    </ListItemIcon>
                    <ListItemText inset>
                      {t('PROFILE.MENU.CHANGE_PASSWORD')}
                    </ListItemText>
                  </MenuItem>

                  <MenuItem>
                    <ListItemIcon>
                      <DeleteIcon/>
                    </ListItemIcon>
                    <ListItemText inset>
                      {t('PROFILE.MENU.DELETE_ACCOUNT')}
                    </ListItemText>
                  </MenuItem>
                </Menu>
              </React.Fragment>
            }
            title={t('PROFILE.TITLE')}
          />

          <CardContent>
            <form>
              <TextField
                label={t('PROFILE.USERNAME')}
                margin="normal"
                variant="outlined"
                value={form.username}
                onChange={this.handleTimeoutChange('username')}
                className={classes.input}
              />

              <TextField
                label={t('PROFILE.EMAIL')}
                margin="normal"
                variant="outlined"
                value={form.email}
                onChange={this.handleTimeoutChange('email')}
                className={classes.input}
              />

              <Divider className={classes.divider}/>

              <TextField
                select
                label={t('PROFILE.LANGUAGE')}
                value={form.language}
                className={classes.input}
                SelectProps={{
                  MenuProps: {
                    className: classes.input
                  },
                }}
                onChange={this.handleLanguage}
                margin="normal"
                variant="outlined"
              >
                {
                  languages.map((language, i) => (
                    <MenuItem key={i} value={language.language}>
                      {t(language.name)}
                    </MenuItem>
                  ))
                }
              </TextField>
            </form>
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

/** Export with material theme and translations. */
export default materialTranslated(Profile, styles);
