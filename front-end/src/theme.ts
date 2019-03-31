import { createMuiTheme } from '@material-ui/core';
import { amber } from '@material-ui/core/colors';

/**
 * Global material theme.
 */
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5c6bc0',
    },
    secondary: amber,
    type: 'light'
  }
});
