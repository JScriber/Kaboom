import { Theme, createStyles } from '@material-ui/core';
import { Language } from 'src/translation/translation';
import { TranslateAndStyle } from 'src/utils';

/**
 * Component styling.
 * @param theme 
 */
export const styles = (theme: Theme) => createStyles({
  input: {
    width: '100%'
  }
});

export interface IProps extends TranslateAndStyle<typeof styles> {
  label: string;
  value: Language;
  onChange: (event: React.FormEvent) => void;
}
