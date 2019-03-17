import * as React from 'react';
import { TextField, Button } from '@material-ui/core';

import { materialTranslated } from 'src/utils';
import { BaseForm } from '../../form/Formik';

// Models.
import { IProps, Form, styles } from './LoginForm.model';

/**
 * Login form.
 */
class LoginForm extends BaseForm<Form, IProps> {

  render() {
    const { classes, t, values, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.input}
          label={t('LOGIN.USERNAME')}
          name="username"
          margin="normal"
          variant="outlined"
          value={values.username}
          helperText={this.showError('username')}
          error={this.hasError('username')}
          onChange={this.change('username')}
        />

        <TextField
          className={classes.input}
          label={t('LOGIN.PASSWORD')}
          name="password"
          margin="normal"
          variant="outlined"
          value={values.password}
          helperText={this.showError('password')}
          type="password"
          error={this.hasError('password')}
          onChange={this.change('password')}
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
