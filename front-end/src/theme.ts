import { createMuiTheme } from '@material-ui/core';

/**
 * Global material theme.
 */
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#494286',
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    type: 'light',
  },
});
