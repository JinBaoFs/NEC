'use client';

import { Flex, Center, IconButton, useMediaQuery } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import useSWR from 'swr';
import { useFooterConfig } from '@/hooks/useConfig';

import REQUEST_API from '@/api/api';
import { ajaxGet } from '@/api/axios';
import { axiosUrlType } from '@/api/type';
import { formatNumber } from '@/lib';
import IconSvg from '../IconSvg';
import ChakraMotionBox from '../ChakraMotionBox';
import Tag from '../Tag';

const FooterContent = () => {
  const { iconList } = useFooterConfig();
  const path = usePathname();

  const handldLink = useCallback((item: { link: string }) => {
    window.open(item.link, '_blank');
  }, []);

  const [isLargerThan1600] = useMediaQuery('(min-width: 1600px)');
  const [isLargerThan1500] = useMediaQuery('(min-width: 1500px)');
  const { data } = useSWR<{
    tvl: number;
    user_count: number;
  }>(REQUEST_API.config, url => ajaxGet(url as axiosUrlType), {
    revalidateOnFocus: false
  });

  return (
    <>
      <Flex
        bottom={isLargerThan1600 ? 90 : 50}
        pos={'fixed'}
        right={isLargerThan1500 ? '90px' : '20px'}
        transitionDuration={'normal'}
      >
        <Flex
          flexDir={'column'}
          gap={7}
        >
          <Center
            flexDir={'row'}
            gap={7}
            justifyContent={'space-between'}
          >
            {iconList.map((item, index) => {
              return (
                <ChakraMotionBox
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  initial={{ y: 100, opacity: 0, scale: 0.5 }}
                  key={index + 'icon'}
                  transition={{
                    delay: `${index * 0.1}`
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <IconButton
                    aria-label={item.icon}
                    colorScheme="white"
                    h={'44px'}
                    icon={
                      <IconSvg
                        _hover={{
                          color: 'white'
                        }}
                        boxSize={'6'}
                        color={'white'}
                        cursor={'pointer'}
                        gap={4}
                        name={item.icon}
                        transitionDuration={'normal'}
                      />
                    }
                    isRound
                    onClick={() => handldLink(item)}
                    outline={'none'}
                    variant={'outline'}
                    w={'44px'}
                  ></IconButton>
                </ChakraMotionBox>
              );
            })}
          </Center>
        </Flex>
      </Flex>
      {!['/bcc'].includes(path) && (
        <Flex
          bottom={isLargerThan1600 ? 90 : 50}
          gap={90}
          left={'50%'}
          pos={'fixed'}
          px={{
            base: 20,
            xl: 0
          }}
          right={'66'}
          transform={'translateX(-50%)'}
          transitionDuration={'normal'}
          w={{
            base: '100%',
            xl: 'container.md'
          }}
          zIndex={'dropdown'}
        >
          <Tag text={`TVL / ${formatNumber(data?.tvl || 0)}`} />
          <Tag
            text={`TOTAL USERS / ${formatNumber(data?.user_count || 0, 0)}`}
          />
        </Flex>
      )}
    </>
  );
};

const Footer = () => {
  return (
    <>
      <FooterContent />
    </>
  );
};
export default Footer;
