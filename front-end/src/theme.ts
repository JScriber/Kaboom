import { createMuiTheme } from '@material-ui/core';

/**
 * Global material theme.
 */
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#494286',
      light: '#494286',
      dark: '#7d77b3'
    },
    secondary: {
      light: '#0066ff',
      dark: '#7d77b3',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    type: 'light',
  }
});
