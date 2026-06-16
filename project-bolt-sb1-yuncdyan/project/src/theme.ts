import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e5ff',
      light: '#6effff',
      dark: '#00b2cc',
      contrastText: '#000000',
    },
    secondary: {
      main: '#00ff41',
      light: '#69ff6e',
      dark: '#00cb16',
      contrastText: '#000000',
    },
    error: {
      main: '#ff0055',
    },
    warning: {
      main: '#ff9900',
    },
    background: {
      default: '#000000',
      paper: '#030d12',
    },
    text: {
      primary: '#00e5ff',
      secondary: '#00ff41',
      disabled: 'rgba(0, 229, 255, 0.4)',
    },
    divider: 'rgba(0, 229, 255, 0.15)',
  },
  typography: {
    fontFamily: '"Share Tech Mono", "Courier New", monospace',
    h1: { fontFamily: '"Orbitron", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Orbitron", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Orbitron", sans-serif', fontWeight: 500 },
    h4: { fontFamily: '"Orbitron", sans-serif', fontWeight: 500 },
    h5: { fontFamily: '"Orbitron", sans-serif', fontWeight: 400 },
    h6: { fontFamily: '"Orbitron", sans-serif', fontWeight: 400 },
    button: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 700,
      letterSpacing: '0.15em',
    },
  },
  shape: {
    borderRadius: 2,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth' },
        body: {
          backgroundColor: '#000000',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-track': { background: '#000' },
          '&::-webkit-scrollbar-thumb': { background: '#00e5ff', borderRadius: '2px' },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 229, 255, 0.08)',
          borderRadius: 0,
        },
        bar: { borderRadius: 0 },
      },
    },
  },
});

export default theme;
