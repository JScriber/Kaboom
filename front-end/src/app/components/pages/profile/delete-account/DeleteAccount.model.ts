import { Theme, createStyles, WithStyles } from '@material-ui/core';
import { WithTranslation } from 'react-i18next';

/**
 * Component styling.
 * @param theme 
 */
export const styles = (theme: Theme) => createStyles({

});

export interface IProps extends WithStyles<typeof styles>, WithTranslation {
  open: boolean;
  onClose: () => void;
}

export interface IState {
  loading: boolean;
}

