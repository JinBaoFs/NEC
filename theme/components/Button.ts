import {
  defineStyle,
  defineStyleConfig,
  StyleFunctionProps
} from '@chakra-ui/styled-system';

const baseStyle = defineStyle((props: StyleFunctionProps) => {
  const { colorScheme: c } = props;
  return {
    cursor: 'pointer',
    lineHeight: 1,
    backgroundColor: `${c}.600`,
    transitionDuration: 'normal',
    _focusVisible: {
      boxShadow: 'none'
    }
  };
});

const sizes = {
  md: defineStyle(() => {
    return {
      height: '44px',
      fontSize: 'sm',
      fontWeight: '500',
      px: '4',
      py: '3',
      borderRadius: '10px',
      _hover: {
        opacity: 0.9
      }
    };
  }),
  lg: defineStyle(() => {
    return {
      height: '62px',
      fontSize: 'xl',
      borderRadius: 'full',
      fontWeight: '400',
      _hover: {
        opacity: 0.9
      }
    };
  })
};

const solid = defineStyle(() => {
  return {
    color: 'black',
    bg: 'white',
    _hover: {
      bg: 'whiteAlpha.900',
      _disabled: {
        opacity: 0.5,
        bg: 'whiteAlpha.900'
      }
    },
    _active: {
      bg: 'whiteAlpha.700'
    },
    _disabled: {
      opacity: 0.5
    }
  };
});

const outLine = defineStyle((props: StyleFunctionProps) => {
  const {
    colorScheme: c,
    theme: {
      colors: { purple, blue }
    }
  } = props;

  if (c === 'white') {
    return {
      color: c,
      borderColor: c,
      border: '1px solid'
    };
  }

  if (c === 'purple') {
    return {
      color: 'white',
      border: '1px solid rgba(255, 255, 255, 0.40)',
      bg: 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) -9.62%, rgba(255, 255, 255, 0.12) 106.41%)',
      backdropBlur: '10px',
      boxShadow:
        '0px 10px 40px 0px rgba(255, 255, 255, 0.20), 0px 10px 30px 0px rgba(255, 255, 255, 0.70) inset'
    };
  }
  if (c === 'blue') {
    return {
      color: 'black',
      border: `1px solid ${purple['400']}`,
      bg: `linear-gradient(225deg, ${purple['600']} 0%, #A1FFFF 100%)`,
      backdropBlur: '10px',
      boxShadow: `0px 10px 40px 0px ${purple['500']}, 0px 10px 30px 0px ${blue['500']} inset`
    };
  }
  return {};
});

export default defineStyleConfig({
  baseStyle,
  sizes,
  variants: {
    solid,
    outLine
  },
  defaultProps: {
    colorScheme: 'purple'
  }
});
