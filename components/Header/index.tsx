'use client';
import {
  Center,
  Image,
  Flex,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody
} from '@chakra-ui/react';
// import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useParams, usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { useHeaderConfig } from '@/hooks/useConfig';
// import useNetworkError from '@/hooks/useNetworkError';
// import Language from '../Language';

const Header = () => {
  const [bg, setBg] = useState('whiteAlpha.100');
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', latest => {
    setBg(latest > 100 ? 'black' : 'whiteAlpha.100');
  });
  // const networkStatus = useNetworkError();

  return (
    <Center
      bg={bg}
      h={'80px'}
      left={0}
      pos={'fixed'}
      top={0}
      transitionDuration={'normal'}
      w={'full'}
      zIndex={'banner'}
    >
      <Center
        justifyContent={'space-between'}
        px={{
          base: 20,
          xl: '0'
        }}
        w={{
          base: '100%',
          xl: 'container.md'
        }}
      >
        <Center gap={'80px'}>
          <Image
            alt=""
            height={'46px'}
            src={'/assets/img/BCC.png'}
            w={'46px'}
          />
        </Center>
        <Center gap={2}>
          <Banner />
          {/* <Show
            above="md"
            ssr
          >
            <Language />
          </Show> */}
          <ConnectButton
            chainStatus={{
              smallScreen: 'none',
              largeScreen: 'icon'
            }}
            showBalance={false}
          />
        </Center>
      </Center>
    </Center>
  );
};

export default Header;

export const Banner = () => {
  const { locale } = useParams();
  const path = usePathname();
  const list = useHeaderConfig();
  const currentIndex = useCallback(
    (item: { path?: string }) => {
      return (
        path.replace(locale !== 'en' ? '/' + locale : '', '') === item.path
      );
    },
    [path, locale]
  );

  return (
    <Flex
      gap={'30px'}
      mr={'60px'}
    >
      {list.map((item, index) => {
        return (
          <Box
            _hover={{
              ...(currentIndex(item)
                ? {
                    color: 'white'
                    // bgGradient: 'linear(to-b, #EDBAFF, #A1FFFF)'
                  }
                : {
                    color: 'white',
                    fontWeight: currentIndex(item) ? 500 : 500
                  })
            }}
            color={currentIndex(item) ? 'white' : 'whiteAlpha.600'}
            cursor={'pointer'}
            key={index}
            {...(currentIndex(item)
              ? {
                  // color: 'white',
                  // bgGradient: 'linear(to-b, #EDBAFF, #A1FFFF)',
                  // bgClip: 'text',
                  fontWeight: 600
                }
              : {})}
            __css={{
              backgroundClip: 'text'
            }}
            fontFamily={'alate'}
            fontSize={'sm'}
            lineHeight={'5'}
            transitionDuration={'normal'}
          >
            {item?.children ? (
              <Popover
                isLazy
                placement="bottom-start"
                trigger="hover"
              >
                <PopoverTrigger>
                  <Box role="button">{item.name}</Box>
                </PopoverTrigger>
                <PopoverContent
                  _focusVisible={{ outline: 'none' }}
                  bg={'black'}
                  border={'1px solid'}
                  borderColor={'whiteAlpha.200'}
                  borderRadius={'3xl'}
                  color="white"
                  overflow={'hidden'}
                  w={'187px'}
                >
                  <PopoverBody
                    px={0}
                    py={0}
                  >
                    <Box>
                      {item.children.map((child, cindex) => {
                        return (
                          <Link
                            href={child.path || '/'}
                            key={cindex}
                            target={
                              child.path.indexOf('http') !== -1 ? '_blank' : ''
                            }
                          >
                            <Box
                              _hover={{
                                borderColor: 'whiteAlpha.300',
                                backdropFilter: 'blur(10px)',
                                bg: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) -40.91%, white 132.95%)',
                                boxShadow:
                                  '0px 10px 40px 0px purple.500, 0px 10px 30px 0px rgba(255, 255, 255, 0.70) inset'
                              }}
                              border={'1px solid'}
                              borderColor={'transparent'}
                              fontSize={'xs'}
                              h={'44px'}
                              lineHeight={'44px'}
                              px={'6'}
                            >
                              {child.name}
                            </Box>
                          </Link>
                        );
                      })}
                    </Box>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            ) : (
              <Link href={item.path || '/'}>{item.name}</Link>
            )}
          </Box>
        );
      })}
    </Flex>
  );
};
