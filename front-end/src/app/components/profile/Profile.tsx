import * as React from 'react';
import { CardContent, Card, Button, CardHeader, IconButton, TextField, MenuItem,
  CardActions, Menu, ListItemIcon, ListItemText, OutlinedInput } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SecurityIcon from '@material-ui/icons/Security';
import DeleteIcon from '@material-ui/icons/DeleteForever';

// Style.
import { materialTranslated } from 'src/utils';
import { IProps, IState, Form, styles } from './Profile.model';
import { Language, languages } from 'src/translation/translation';

/**
 * Component used to create a server.
 * Acts as an orchestrator.
 */
class Profile extends React.Component<IProps, IState> {

  /** State initialization. */
  state: IState = {
    anchorEl: null,
    form: {
      username: 'Kaboom',
      email: 'anthony@gmail.com',
      language: Language.French
    }
  };

  handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => this.setState({ anchorEl: null });

  /**
   * Handles form value change.
   * @param key
   */
  handleChange = (key: keyof(Form)) => (event: React.FormEvent) => {
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
  };

  render() {
    const { classes, t } = this.props;
    const { form } = this.state;
    const open = Boolean(this.state.anchorEl);

    return (
      <React.Fragment>
        <Card className={classes.card}>
        <CardHeader
          action={
            <React.Fragment>
              <IconButton
                aria-owns={open ? 'menu-profile' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
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
                onChange={this.handleChange('username')}
                className={classes.input}
              />

              <TextField
                label={t('PROFILE.EMAIL')}
                margin="normal"
                variant="outlined"
                value={form.email}
                onChange={this.handleChange('email')}
                className={classes.input}
              />

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

          <CardActions>
            <Button variant="contained" className={classes.button} color="primary">
              {t('PROFILE.SAVE_ACTION')}
            </Button>
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
}

/** Export with material theme and translations. */
export default materialTranslated(Profile, styles);
