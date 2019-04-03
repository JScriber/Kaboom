import { Theme, createStyles, WithStyles } from '@material-ui/core';
import { WithTranslation } from 'react-i18next';
import { Game } from './server/Server.model';

/**
 * Component styling.
 * @param theme 
 */
export const styles = (theme: Theme) => createStyles({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
});

export interface IProps extends WithStyles<typeof styles>, WithTranslation {}

export interface IState {
  games: Game[];
}
