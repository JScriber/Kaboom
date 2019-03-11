import { Theme, WithStyles } from '@material-ui/core';

/** Custom material CSS. */
export const styles = (theme: Theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    flex: 1,
    marginLeft: 12
  },
  iconButton: {
    padding: 10,
  }
});

/** Props of the component. */
export interface IProps extends WithStyles<typeof styles> {
  placeholder: string;
  onSearch: (text: string) => void;
}

/** State of the component. */
export interface IState {
  value: string;
}
