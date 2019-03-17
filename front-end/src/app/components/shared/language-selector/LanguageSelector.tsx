import * as React from 'react';
import { TextField, MenuItem, withStyles } from '@material-ui/core';

// System-wide.
import i18n, { Language, languages } from 'src/translation/translation';
import { materialTranslated } from 'src/utils';

// Model.
import { IProps, styles } from './LanguageSelector.model';

/**
 * Component used for language selection.
 */
class LanguageSelector extends React.Component<IProps> {

  /** Handles language changes. */
  private handleLanguage = (event: React.FormEvent) => {
    const language: Language = (event.target as HTMLInputElement).value as Language;

    // Magic hack. DON'T TOUCH.
    i18n.changeLanguage(language, () => {
      const time: NodeJS.Timeout = setTimeout(() => i18n
        .changeLanguage(language) && clearTimeout(time), 50);
    });

    this.props.onChange(event);
  };

  render() {
    const { classes, t, name, label, value } = this.props;

    return (
      <TextField
        select
        name={name}
        label={label}
        value={value}
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
    );
  }
}

/** Export with material theme and translations. */
export default materialTranslated(LanguageSelector, styles);
