import { createTheme } from '@mui/material/styles'

const focusRing = '0 0 0 3px rgba(37, 99, 235, 0.24)'

export const appTheme = createTheme({
  cssVariables: {
    cssVarPrefix: 'flowlogix',
  },
  palette: {
    mode: 'light',
    primary: {
      light: '#60A5FA',
      main: '#2563EB',
      dark: '#1E40AF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#2DD4BF',
      main: '#0F766E',
      dark: '#115E59',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#15803D',
    },
    warning: {
      main: '#B45309',
    },
    error: {
      main: '#B91C1C',
    },
    info: {
      main: '#0369A1',
    },
    background: {
      default: '#F4F7FB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0F172A',
      secondary: '#526076',
    },
    divider: '#DCE4EF',
    grey: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0B1739',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: [
      '"Segoe UI Variable"',
      '"Segoe UI"',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'sans-serif',
    ].join(','),
    fontSize: 14,
    h1: {
      fontSize: '2rem',
      fontWeight: 760,
      letterSpacing: '-0.035em',
      lineHeight: 1.12,
    },
    h2: {
      fontSize: '1.25rem',
      fontWeight: 720,
      letterSpacing: '-0.018em',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1.35,
    },
    body1: {
      lineHeight: 1.65,
    },
    body2: {
      lineHeight: 1.55,
    },
    button: {
      fontWeight: 650,
      letterSpacing: 0,
    },
    overline: {
      fontSize: '0.7rem',
      fontWeight: 750,
      letterSpacing: '0.12em',
      lineHeight: 1.8,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          minHeight: '100%',
          backgroundColor: '#F4F7FB',
        },
        body: {
          minWidth: 320,
          minHeight: '100%',
          margin: 0,
          backgroundColor: '#F4F7FB',
          color: '#0F172A',
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '#root': {
          minHeight: '100%',
        },
        '::selection': {
          backgroundColor: 'rgba(37, 99, 235, 0.18)',
          color: '#0F172A',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: 40,
          borderRadius: 10,
          textTransform: 'none',
          transition: 'transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease',
          '&:focus-visible': {
            boxShadow: focusRing,
          },
          '@media (prefers-reduced-motion: reduce)': {
            transition: 'none',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFormControl: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 650,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        outlined: {
          borderColor: '#DCE4EF',
        },
      },
    },
  },
})
