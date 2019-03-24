import * as React from 'react';
import { TextField, Button } from '@material-ui/core';

import { materialTranslated } from 'src/utils';
import { BaseForm } from '../../../shared/form/Formik';

// Models.
import { IProps, Form, styles } from './LoginForm.model';

/**
 * Login form.
 */
class LoginForm extends BaseForm<Form, IProps> {

  render() {
    const { classes, t, values, handleSubmit } = this.props;

    // Username key.
    const USERNAME: keyof(Form) = 'username';

    // Password key.
    const PASSWORD: keyof(Form) = 'password';

    return (
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.input}
          label={t('LOGIN.USERNAME')}
          margin="normal"
          variant="outlined"
          name={USERNAME}
          value={values[USERNAME]}
          helperText={this.showError(USERNAME)}
          error={this.hasError(USERNAME)}
          onChange={this.change(USERNAME)}
        />

        <TextField
          className={classes.input}
          label={t('LOGIN.PASSWORD')}
          margin="normal"
          variant="outlined"
          type="password"
          name={PASSWORD}
          value={values[PASSWORD]}
          helperText={this.showError(PASSWORD)}
          error={this.hasError(PASSWORD)}
          onChange={this.change(PASSWORD)}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}>
          {t('LOGIN.SUBMIT_ACTION')}
        </Button>
      </form>
    );
  };
}

/** Export with material theme and translations. */
export default materialTranslated(LoginForm, styles);
