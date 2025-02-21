import { Box, BoxProps, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

const FilterCard = ({
  children,
  beforeProps,
  ...boxProps
}: { children: React.ReactNode; beforeProps?: BoxProps } & BoxProps) => {
  return (
    <Box
      _before={{
        content: '""',
        pos: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '3xl',
        padding: '1px',
        background:
          'linear-gradient(180deg,rgba(80, 80, 83, 1),rgba(51, 51, 52, 0.5))',
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'destination-out',
        ...beforeProps
      }}
      backdropFilter={'blur(20px)'}
      bg={
        'radial-gradient(146.13% 118.42% at 50% -15.5%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(180deg, rgba(46, 51, 90, 0.10) 0%, rgba(28, 27, 51, 0.02) 100%)'
      }
      borderRadius={'3xl'}
      color={'white'}
      h={'100%'}
      pos={'relative'}
      px={5}
      py={3.5}
      w={'100%'}
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export default FilterCard;

export const ContentFilterCard = ({
  title,
  desc,
  ...boxProps
}: { title: string; desc: string } & BoxProps) => {
  return (
    <FilterCard
      h={'210px'}
      w={'360px'}
      {...boxProps}
    >
      <Text
        fontSize={'lg'}
        fontWeight={'500'}
        lineHeight={'30px'}
        mb={2}
      >
        {title}
      </Text>
      <Text
        color={'whiteAlpha.700'}
        fontSize={'sm'}
        fontWeight={'400'}
        lineHeight={'6'}
      >
        {desc}
      </Text>
    </FilterCard>
  );
};

export const BgCard = ({
  children,
  ...boxProps
}: PropsWithChildren & BoxProps) => {
  return (
    <Box
      backdropBlur={'15px'}
      bg={
        'url(/assets/img/card-bg.png), radial-gradient(146.13% 118.42% at 50% -15.5%, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.16) 100%)'
      }
      border={'1px solid'}
      borderColor={'whiteAlpha.200'}
      borderRadius={'3xl'}
      p={7.5}
      {...boxProps}
    >
      {children}
    </Box>
  );
};
