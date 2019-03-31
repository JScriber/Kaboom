import * as React from 'react';
import { TextField, InputAdornment, IconButton, DialogContent, DialogActions, Button } from '@material-ui/core';

import { materialTranslated } from 'src/utils';
import { BaseForm } from '../../../../shared/form/Formik';

// Icons.
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Models.
import { IProps, IState, Form, styles } from './DeleteAccountForm.model';

/**
 * New password form.
 */
class DeleteAccountForm extends BaseForm<Form, IProps, IState> {

  /** State initialisation. */
  state: IState = {
    showPassword: false
  };

  /** Toggles password visibility. */
  private togglePassword = () => this.setState({ showPassword: !this.state.showPassword });

  render() {
    const { classes, t, values, handleSubmit, onClose } = this.props;
    const { showPassword } = this.state;

    // Password key.
    const PASSWORD: keyof(Form) = 'password';

    return (
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
              label={t('PROFILE.DELETE_ACCOUNT.PASSWORD')}
              margin="normal"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              className={classes.input}
              name={PASSWORD}
              value={values[PASSWORD]}
              helperText={this.showError(PASSWORD)}
              error={this.hasError(PASSWORD)}
              onChange={this.change(PASSWORD)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={this.togglePassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              fullWidth
            />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary">
            {t('PROFILE.DELETE_ACCOUNT.BUTTONS.CANCEL')}
          </Button>
          <Button color="primary" type="submit" disabled={!this.props.isValid}>
            {t('PROFILE.DELETE_ACCOUNT.BUTTONS.VALIDATE')}
          </Button>
        </DialogActions>
      </form>
    );
  };
}

/** Export with material theme and translations. */
export default materialTranslated(DeleteAccountForm, styles);
