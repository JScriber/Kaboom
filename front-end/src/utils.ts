import { WithStyles } from '@material-ui/core';
import { ComponentType } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { withStyles, StyleRulesCallback } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';

// Style allowed.
type Style = StyleRulesCallback | StyleRules;

// Linkage interface.
export interface TranslateAndStyle<S extends Style> extends WithTranslation, WithStyles<S> {}

// HOC simplifier.
export const materialTranslated = <P extends TranslateAndStyle<S>, S extends Style>(
  component: ComponentType<P>,
  styles: S): ComponentType<Partial<P>> => {

  // Translation transformation.
  const translated = withTranslation()(component) as ComponentType<P>;

  // Style transformation.
  const styled = withStyles(styles, { withTheme: true })(translated as any);

  return styled as ComponentType<Partial<P>>;
};
