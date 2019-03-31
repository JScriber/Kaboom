import * as React from 'react';
import { TextField, InputAdornment, IconButton, Tooltip, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

import { materialTranslated } from 'src/utils';
import { BaseForm } from '../../../../shared/form/Formik';

// Icons.
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AutoRenew from '@material-ui/icons/AutorenewOutlined';

// Models.
import { IProps, IState, Form, styles } from './NewPasswordForm.model';

/**
 * New password form.
 */
class NewPasswordForm extends BaseForm<Form, IProps, IState> {

  /** State initialisation. */
  state: IState = {
    showNewPassword: false,
    showOldPassword: false  
  };

  /** Toggles old password visibility. */
  private toggleOldPassword = () => this.setState({ showOldPassword: !this.state.showOldPassword });

  /** Toggles new password visibility. */
  private toggleNewPassword = () => this.setState({ showNewPassword: !this.state.showNewPassword });

  /** Generates a new password. */
  private generatePassword = () => {
    const generated = this.props.generatePassword();

    this.props.setFieldValue('newPassword', generated, true);
    this.setState({ showNewPassword: true });
  };

  render() {
    const { classes, t, values, handleSubmit, onClose } = this.props;
    const { showOldPassword, showNewPassword } = this.state;

    // Old password key.
    const OLD_PASSWORD: keyof(Form) = 'oldPassword';

    // New password key.
    const NEW_PASSWORD: keyof(Form) = 'newPassword';

    return (
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText className={classes.description}>
            {t('PROFILE.PASSWORD_NEW.DESCRIPTION')}
          </DialogContentText>

          <TextField
              label={t('PROFILE.PASSWORD_NEW.OLD')}
              margin="normal"
              variant="outlined"
              type={showOldPassword ? 'text' : 'password'}
              className={classes.input}
              name={OLD_PASSWORD}
              value={values[OLD_PASSWORD]}
              helperText={this.showError(OLD_PASSWORD)}
              error={this.hasError(OLD_PASSWORD)}
              onChange={this.change(OLD_PASSWORD)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={this.toggleOldPassword}>
                      {showOldPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              fullWidth
            />

            <TextField
              label={t('PROFILE.PASSWORD_NEW.NEW')}
              margin="normal"
              variant="outlined"
              type={showNewPassword ? 'text' : 'password'}
              className={classes.input}
              name={NEW_PASSWORD}
              value={values[NEW_PASSWORD]}
              helperText={this.showError(NEW_PASSWORD)}
              error={this.hasError(NEW_PASSWORD)}
              onChange={this.change(NEW_PASSWORD)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title={t('PROFILE.PASSWORD_NEW.GENERATE')} aria-label="Generate password">
                      <IconButton onClick={this.generatePassword}>
                        <AutoRenew/>
                      </IconButton>
                    </Tooltip>

                    <IconButton onClick={this.toggleNewPassword}>
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              fullWidth
            />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary">
            {t('PROFILE.PASSWORD_NEW.BUTTONS.CANCEL')}
          </Button>
          <Button color="primary" type="submit" disabled={!this.props.isValid}>
            {t('PROFILE.PASSWORD_NEW.BUTTONS.VALIDATE')}
          </Button>
        </DialogActions>
      </form>
    );
  };
}

/** Export with material theme and translations. */
export default materialTranslated(NewPasswordForm, styles);
