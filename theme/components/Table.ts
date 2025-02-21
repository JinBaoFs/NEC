import { tableAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys);

const baseStyle = definePartsStyle({
  table: {
    // fontVariantNumeric: 'lining-nums tabular-nums',
    // borderCollapse: 'collapse',
    // width: 'full'
  },
  th: {},
  thead: {
    tr: {
      th: {
        pt: 0,
        color: 'whiteAlpha.700',
        fontWeight: '400',
        fontSize: '14px',
        borderBottomColor: 'whiteAlpha.100'
      }
    }
  },
  tbody: {
    tr: {
      _first: {
        td: {
          pt: 5
        }
      },
      td: {
        fontSize: '12px',
        textAlign: 'start',
        border: 'none',
        py: 2.5
      }
    }
  }
});

export const tableTheme = defineMultiStyleConfig({ baseStyle });
