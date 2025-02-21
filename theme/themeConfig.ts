'use client';

import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
// import type { StyleFunctionProps } from "@chakra-ui/styled-system";
// DaysOneFont
// import { AlataFont } from '@/public/fonts';
import Button from './components/Button';
import Menu from './components/Menu';
import Input from './components/Input';
import { tableTheme } from './components/Table';
import Tabs from './components/Tabs';
import Skeleton from './components/Skeleton';
import { spinnerTheme } from './components/Spinner';

const config: ThemeConfig = {
  cssVarPrefix: 'bcc',
  // initialColorMode: 'dark',
  useSystemColorMode: false
};

const colors = {
  whiteAlpha: {
    100: 'rgba(255, 255, 255, 0.1)',
    200: 'rgba(158, 158, 158, 0.2)',
    300: 'rgba(158, 158, 158, 0.3)',
    400: 'rgba(158, 158, 158, 0.4)',
    500: 'rgba(158, 158, 158, 0.5)',
    600: 'rgba(158, 158, 158, 0.6)',
    700: 'rgba(255, 255, 255, 0.7)',
    800: 'rgba(255, 255, 255, 0.8)',
    900: 'rgba(255, 255, 255, 0.9)'
  },
  blackAlpha: {
    400: 'rgba(0, 0, 0, 0.40)',
    600: 'rgba(0, 0, 0, 0.60)'
  },
  blue: {
    500: 'rgba(73, 123, 255, 0.70)',
    600: '#A1FFFF',
    700: '#2670E9'
  },
  purple: {
    400: 'rgba(39, 55, 207, 0.40)',
    500: 'rgba(63, 74, 175, 0.50)',
    600: '#EDBAFF',
    700: '#402788',
    800: '#E0CDFF'
  }
};

const theme = extendTheme({
  styles: {
    global: () => {
      return {
        body: {
          fontFamily: 'alate',
          bg: 'black',
          color: 'white',
          lineHeight: 1
        }
      };
    }
  },
  space: {
    '7.5': '1.875rem'
  },
  sizes: {
    sm: '518px',
    container: {
      md: '1200px',
      lg: '1320px'
    }
  },
  fontSizes: {
    '3.5xl': '2rem'
  },
  config,
  colors,
  shadows: {},
  components: {
    Button,
    Menu,
    Table: tableTheme,
    Input,
    Tabs,
    Skeleton,
    Spinner: spinnerTheme
  },
  breakpoints: {},
  radii: {
    xl: '0.625rem',
    '3xl': '1.25rem',
    '4xl': '1.40625rem'
  },
  fonts: {
    alate: 'Inter, sans-serif',
    //  AlataFont.style.fontFamily,
    day: 'Inter, sans-serif'
    // || DaysOneFont.style.fontFamily
  }
});

export default theme;
