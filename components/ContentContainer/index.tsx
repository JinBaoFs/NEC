'use client';
import { Box, BoxProps } from '@chakra-ui/react';

const ContentContainer = ({
  children,
  ...boxProps
}: { children: React.ReactNode } & BoxProps) => {
  return (
    <Box
      h={'100vh'}
      margin={'0 auto'}
      pos={'relative'}
      pt={'80px'}
      px={{
        '2xl': 0,
        xl: 10,
        base: 20
      }}
      width={{
        base: '100%',
        xl: 'container.md'
      }}
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export default ContentContainer;
