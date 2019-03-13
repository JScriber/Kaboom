import { ComponentType } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { withStyles, StyleRulesCallback } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';

type Style = StyleRulesCallback | StyleRules;

// HOC simplifier.
export const materialTranslated = (component: ComponentType<WithTranslation>, styles: Style) => {
  const translated = withTranslation()(component);
  
  return withStyles(styles, {
    withTheme: true
  })(translated);
}
