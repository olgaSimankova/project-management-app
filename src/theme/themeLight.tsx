import { createTheme } from '@mui/material';

export const themeLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#81d4fa[200]',
      main: '#2196f3[500]',
      dark: '#0277bd[800]',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffe082[200]',
      main: '#ffc107[500]',
      dark: '#ff8f00[800]',
      contrastText: '#fff',
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #FF6753 30%, #FF8F50 90%)',
          borderRadius: 10,
          border: 0,
          color: 'white',
          height: 48,
          padding: '0 30px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontFamily: 'Paytone One',
          fontWeight: 600,
          lineHeight: 1.27,
          letterSpacing: '-0.06em',
          color: 'white',
          textAlign: 'left',
        },
        h5: {
          fontFamily: 'Signika',
          fontWeight: 600,
          color: 'white',
        },
      },
    },
  },
});
