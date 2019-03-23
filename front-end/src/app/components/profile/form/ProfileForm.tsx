import * as React from 'react';
import { TextField, Button, Divider } from '@material-ui/core';

import { materialTranslated } from 'src/utils';
import { BaseForm } from '../../form/Formik';

// Models.
import { IProps, Form, styles } from './ProfileForm.model';
import LanguageSelector from '../../shared/language-selector/LanguageSelector';

/** Time before the informations get sent (in miliseconds). */
const FORM_TIMEOUT = 800;

/**
 * Profile form.
 */
class ProfileForm extends BaseForm<Form, IProps> {

  /** Form timeout. */
  private timeout: NodeJS.Timeout;

  /**
   * Changes the value of the field and tries a submit.
   * @param field
   * @param {boolean} [timeout = true]
   */
  private dynamicChange = (field: keyof(Form) & string, timeout = true) =>
    (e: React.ChangeEvent) => {
      this.change(field)(e);

      if (this.props.isValid) {
        timeout ? this.updateTimeout()
                : this.directSubmit();
      }
    };

  /** Updates the timeout. */
  private updateTimeout() {
    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(this.props.submitForm, FORM_TIMEOUT);
  };

  /** Directly sends the form. */
  private directSubmit() {
    if (this.timeout) clearTimeout(this.timeout);

    setTimeout(this.props.submitForm);
  }

  render() {
    const { classes, t, values, handleSubmit } = this.props;

    // Username key.
    const USERNAME: keyof(Form) = 'username';

    // Email key.
    const EMAIL: keyof(Form) = 'email';

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
          onChange={this.dynamicChange(USERNAME)}
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
          onChange={this.dynamicChange(EMAIL)}
        />

        <Divider className={classes.divider}/>

        <LanguageSelector
          label={t('SIGNUP.LANGUAGE')}
          name={LANGUAGE}
          value={values[LANGUAGE]}
          onChange={this.dynamicChange(LANGUAGE, false)}
        ></LanguageSelector>
      </form>
    );
  };
}

/** Export with material theme and translations. */
export default materialTranslated(ProfileForm, styles);
