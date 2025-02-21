'use client';

import { Box, Flex, Image, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { PropsWithChildren, useMemo } from 'react';
import ContentContainer from '@/components/ContentContainer';
import Tag from '@/components/Tag';
import { ajaxGet } from '@/api/axios';
import { axiosUrlType } from '@/api/type';
import REQUEST_API from '@/api/api';
import { airdropUserInfo, JoinUserInfo } from '@/types/global';
import { useUserInfo } from '@/state/userInfo/hook';
import IconSvg from '@/components/IconSvg';
import TimeFormate from '@/components/TimeFormate';
import ChakraMotionBox from '@/components/ChakraMotionBox';
import { useListVariant } from '@/hooks/variant';
import LoadDataContainer from '@/components/LoadDataContainer';

const JoinWrapper = () => {
  const { data, isLoading } = useSWR<{ data: JoinUserInfo[] }>(
    `${REQUEST_API.rank}`,
    url => ajaxGet(url as axiosUrlType),
    {
      revalidateOnFocus: false
    }
  );

  const { container, child } = useListVariant();

  return (
    <ChakraMotionBox
      __css={{
        '&::-webkit-scrollbar': {
          width: 0
        }
      }}
      animate={data?.data ? 'show' : 'hidden'}
      border={'1px'}
      borderColor={'whiteAlpha.100'}
      borderRadius={'xl'}
      display={'flex'}
      flex={1}
      flexDir={'column'}
      initial="hidden"
      mt={6}
      overflowY={'auto'}
      p={4}
      variants={container}
    >
      <LoadDataContainer
        isLoading={isLoading}
        isNoData={!data?.data.length}
        noNeedConnectWallet
      >
        {data?.data?.map(item => {
          return (
            <ChakraMotionBox
              border={'1px'}
              borderColor={'whiteAlpha.100'}
              borderRadius={'xl'}
              fontSize={'xs'}
              key={item.nickname}
              mb={2.5}
              px={2.5}
              py={1.5}
              variants={child}
            >
              <Flex
                justifyContent={'space-between'}
                lineHeight={1.5}
              >
                <Text>{item.nickname}</Text>
                <Text color={'whiteAlpha.700'}>
                  <TimeFormate date={new Date(item.create_time)} />
                </Text>
              </Flex>
              <Box
                color={'whiteAlpha.700'}
                lineHeight={1.5}
              >
                Invited By {item.spread_address}
              </Box>
            </ChakraMotionBox>
          );
        })}
      </LoadDataContainer>
    </ChakraMotionBox>
  );
};

const ShakeIcon = ({ children }: PropsWithChildren) => {
  return (
    <ChakraMotionBox
      alignItems={'center'}
      animate={{
        // scale: [1, 1.2, 0.8, 1.2, 0.8, 1.2, 1],
        rotate: [0, 25, -25, 25, -25, 25, 0]
      }}
      display={'flex'}
      transition={{
        delay: '1'
      }}
      viewport={{ once: true }}
    >
      {children}
    </ChakraMotionBox>
  );
};

const Rank = () => {
  const userInfo = useUserInfo();
  const { data, isLoading } = useSWR<{
    data: airdropUserInfo[];
    user: airdropUserInfo;
  }>(
    `${REQUEST_API.points}?address=${userInfo?.address || ''}`,
    url => ajaxGet(url as axiosUrlType),
    {
      revalidateOnFocus: false
    }
  );

  const list = useMemo(() => {
    const arr: airdropUserInfo[] = [];
    if (!data?.data) return [];
    return arr.concat(
      userInfo && data?.user
        ? [
            {
              ...data?.user,
              isOwner: true
            }
          ]
        : [],
      data.data
    );
  }, [userInfo, data]);

  const { container, child } = useListVariant();

  return (
    <ChakraMotionBox
      __css={{
        '&::-webkit-scrollbar': {
          width: 0
        }
      }}
      animate={list?.length ? 'show' : 'hidden'}
      display={'flex'}
      flex={1}
      flexDir={'column'}
      initial="hidden"
      overflowY={'auto'}
      py={5}
      variants={container}
      w={'full'}
    >
      <LoadDataContainer
        isLoading={isLoading}
        isNoData={!list?.length}
        noNeedConnectWallet
      >
        {list?.map((item, index) => {
          return (
            <ChakraMotionBox
              alignItems={'center'}
              display={'flex'}
              fontSize={'xs'}
              key={index}
              lineHeight={1.5}
              mb={5}
              px={10}
              variants={child}
            >
              <Text
                fontFamily={'day'}
                w={'130px'}
              >
                {item.rank_id}
              </Text>
              <Flex
                alignItems={'center'}
                fontFamily={'day'}
                gap={0.5}
                w={'253px'}
              >
                {item.nickname}
                {item.isOwner && (
                  <ShakeIcon>
                    <IconSvg
                      boxSize={'4'}
                      name="people"
                    />
                  </ShakeIcon>
                )}
              </Flex>
              <Text
                fontFamily={'day'}
                w={'246px'}
              >
                {item.spread_address}
              </Text>
              <Text>{item.points}</Text>
            </ChakraMotionBox>
          );
        })}
      </LoadDataContainer>
    </ChakraMotionBox>
  );
};

const Airdrop = () => {
  return (
    <Box pos={'relative'}>
      <Image
        alt=""
        height={'1080px'}
        pos={'absolute'}
        src="/assets/img/base-bg.png?"
        top={'0px'}
        w={'full'}
        zIndex={'hide'}
      />
      <ContentContainer>
        <Box
          h={'full'}
          pb={'148'}
          pt={'60px'}
        >
          <Box
            backdropBlur={'7.5px'}
            bg={'rgba(5, 5, 5, 0.90)'}
            border={'1px solid'}
            borderColor={'whiteAlpha.100'}
            borderRadius={'4xl'}
            boxShadow={
              '0px 37.5px 75px 0px rgba(255, 255, 255, 0.15) inset, 0px 3.75px 7.5px 0px rgba(0, 0, 0, 0.05), 0px 11.25px 22.5px 0px rgba(0, 0, 0, 0.05), 0px 22.5px 45px 0px rgba(0, 0, 0, 0.10)'
            }
            h={'full'}
            minH={'590px'}
            mixBlendMode={'screen'}
            // overflow={'hidden'}
            p={7.5}
            pos={'relative'}
          >
            {/* <Box
            bg="linear-gradient(135deg, rgba(23, 106, 177, 0.20) 0%, rgba(203, 216, 241, 0.20) 100%)"
            borderRadius={'full'}
            filter={'blur(75px)'}
            height={'858px'}
            left={'160px'}
            mixBlendMode={'screen'}
            pos={'absolute'}
            top={'-240px'}
            w={'858px'}
            zIndex={'hide'}
          ></Box>
          <Box
            bg=" linear-gradient(135deg, rgba(101, 98, 251, 0.46) 0%, rgba(62, 44, 112, 0.26) 50%, rgba(32, 22, 68, 0.60) 100%)"
            borderRadius={'full'}
            filter={'blur(75px)'}
            height={'756px'}
            left={'209px'}
            pos={'absolute'}
            top={'-225px'}
            w={'756px'}
            zIndex={'hide'}
          ></Box> */}

            <Flex
              gap={'60px'}
              h={'full'}
            >
              <Flex
                flexDir={'column'}
                w={{
                  base: '60%',
                  xl: '820px'
                }}
              >
                <Box w={'173px'}>
                  <Tag
                    icon="chart"
                    text="Leaderboard"
                  />
                </Box>
                <Flex
                  alignItems={'center'}
                  bg={'whiteAlpha.200'}
                  border={'1px'}
                  borderColor={'whiteAlpha.100'}
                  borderRadius={'42'}
                  fontSize={'sm'}
                  minH={42}
                  mt={6}
                  px={10}
                >
                  <Text w={'130px'}>Rank</Text>
                  <Text w={'253px'}>Address</Text>
                  <Text w={'246px'}>Invited By</Text>
                  <Text>Points</Text>
                </Flex>
                <Rank />
              </Flex>
              <Flex
                flex={1}
                flexDir={'column'}
                minW={'220px'}
              >
                <Box w={'173px'}>
                  <Tag text="Recently Joined" />
                </Box>
                <JoinWrapper />
              </Flex>
            </Flex>
          </Box>
        </Box>
      </ContentContainer>
    </Box>
  );
};

export default Airdrop;
