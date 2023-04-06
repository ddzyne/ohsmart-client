import React, { forwardRef } from 'react';
import { createTheme } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#0971f1',
    },
    neutral: {
      main: grey[100],
      contrastText: 'black',
    },
    neutralDark: {
      main: grey[300],
      contrastText: grey[500],
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: grey[100],
          color: 'black',
        }
      }
    },
  }
});

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    neutralDark: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
    neutralDark: PaletteOptions['primary'];
  }
}

export default customTheme;