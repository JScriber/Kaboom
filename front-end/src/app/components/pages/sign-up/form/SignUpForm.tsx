import * as React from 'react';
import { TextField, Button, Divider } from '@material-ui/core';

import { materialTranslated } from 'src/utils';
import { BaseForm } from '../../../shared/form/Formik';

// Models.
import { IProps, Form, styles } from './SignUpForm.model';
import LanguageSelector from '../../../shared/language-selector/LanguageSelector';

/**
 * Sign-up form.
 */
class SignUpForm extends BaseForm<Form, IProps> {

  render() {
    const { classes, t, values, handleSubmit } = this.props;

    // Username key.
    const USERNAME: keyof(Form) = 'username';

    // Email key.
    const EMAIL: keyof(Form) = 'email';

    // Password key.
    const PASSWORD: keyof(Form) = 'password';

    // Confirm password key.
    const CONFIRM_PASSWORD: keyof(Form) = 'confirmPassword';

    // Language key.
    const LANGUAGE: keyof(Form) = 'language';

    return (
      <form onSubmit={handleSubmit}>
        <TextField
          label={t('SIGNUP.USERNAME')}
          margin="normal"
          variant="outlined"
          className={classes.input}
          name={USERNAME}
          value={values[USERNAME]}
          helperText={this.showError(USERNAME)}
          error={this.hasError(USERNAME)}
          onChange={this.change(USERNAME)}
        />

        <TextField
          label={t('SIGNUP.EMAIL')}
          margin="normal"
          variant="outlined"
          type="email"
          className={classes.input}
          name={EMAIL}
          value={values[EMAIL]}
          helperText={this.showError(EMAIL)}
          error={this.hasError(EMAIL)}
          onChange={this.change(EMAIL)}
        />

        <TextField
          label={t('SIGNUP.PASSWORD')}
          margin="normal"
          variant="outlined"
          type="password"
          className={classes.input}
          name={PASSWORD}
          value={values[PASSWORD]}
          helperText={this.showError(PASSWORD)}
          error={this.hasError(PASSWORD)}
          onChange={this.change(PASSWORD)}
        />

        <TextField
          label={t('SIGNUP.CONFIRM_PASSWORD')}
          margin="normal"
          variant="outlined"
          type="password"
          className={classes.input}
          name={CONFIRM_PASSWORD}
          value={values[CONFIRM_PASSWORD]}
          helperText={this.showError(CONFIRM_PASSWORD)}
          error={this.hasError(CONFIRM_PASSWORD)}
          onChange={this.change(CONFIRM_PASSWORD)}
        />

        <Divider className={classes.divider}/>

        <LanguageSelector
          label={t('SIGNUP.LANGUAGE')}
          name={LANGUAGE}
          value={values[LANGUAGE]}
          onChange={this.change(LANGUAGE)}
        ></LanguageSelector>

        <Button variant="contained" color="primary" className={classes.button} type="submit">
          {t('SIGNUP.SUBMIT_ACTION')}
        </Button>
      </form>
    );
  };
}

/** Export with material theme and translations. */
export default materialTranslated(SignUpForm, styles);
