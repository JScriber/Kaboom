import { WithStyles, Theme } from '@material-ui/core';
import { WithTranslation } from 'react-i18next';

export const styles = (theme: Theme) => ({
  root: {
    marginBottom: '20px'
  },
  grow: {
    flexGrow: 1,
  }
});

/** Props of the component. */
export interface IProps extends WithStyles<typeof styles>, WithTranslation {}

/** State of the component. */
export interface IState {
  authentificated: boolean;
  anchorEl: any;
}
