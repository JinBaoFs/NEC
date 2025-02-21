import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  inputAnatomy.keys
);

const baseStyle = defineStyle({
  field: {
    border: '1px',
    borderColor: 'blue',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 0,
    appearance: 'none',
    _placeholder: {
      color: '#989898'
    },
    _hover: {
      borderColor: 'transparent'
    },
    _focusVisible: {
      outline: 'none',
      border: 'none',
      boxShadow: 'none'
    }
  }
});

export default defineMultiStyleConfig({ baseStyle });
