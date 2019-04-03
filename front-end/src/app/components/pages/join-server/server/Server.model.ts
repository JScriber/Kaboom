import { Theme, createStyles, WithStyles } from '@material-ui/core';
import { WithTranslation } from 'react-i18next';

/**
 * Component styling.
 * @param theme 
 */
export const styles = (theme: Theme) => createStyles({
  container: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
    padding: 12,
    width: '100%'
  },
  metadata: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'space-between',
    height: '100%',
    margin: '0 5px',
  },
  avatars: {
    display: 'flex',
    flexFlow: 'row nowrap'
  },
  avatar: {
    margin: 3
  }
});

export interface Game {
  duration: number | undefined;
  slots: string[];
  totalSlots: number;
}

export interface IProps extends WithStyles<typeof styles>, WithTranslation, Game {}
