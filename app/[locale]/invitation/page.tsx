'use client';

import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Image,
  Input,
  Text,
  useBoolean,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { useAccount } from 'wagmi';
import ContentContainer from '@/components/ContentContainer';
import IconSvg from '@/components/IconSvg';
import { Copy } from '@/components/Copy';
import NECModal from '@/components/Modal';
import { ajaxGet, ajaxPost } from '@/api/axios';
import { useGetUserInfo, useUserInfo } from '@/state/userInfo/hook';
import LoadDataContainer from '@/components/LoadDataContainer';
import { axiosUrlType } from '@/api/type';
import { InvitaProps } from '@/types/global';
import REQUEST_API from '@/api/api';
import ChakraMotionBox from '@/components/ChakraMotionBox';
import { useListVariant } from '@/hooks/variant';
import { useIsMounted } from '@/hooks/useIsMounted';

const Invitation = () => {
  const [code, setCode] = useState('');
  const [flag, setFlag] = useBoolean();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const userInfo = useUserInfo();
  const account = useAccount();
  const { mutate } = useGetUserInfo();

  const isMounted = useIsMounted();

  const inviteLink = useMemo(() => {
    return isMounted
      ? `${window.location.origin}?inviteCode=${userInfo?.invitation_code}`
      : '';
  }, [userInfo, isMounted]);

  const handleBind = useCallback(async () => {
    try {
      setFlag.on();
      const { status, message } = (await ajaxPost('spread', {
        invitation_code: code
      })) as any;
      setFlag.off();
      onClose();
      setCode('');
      if (status === 200) {
        toast({
          title: 'Bind success',
          status: 'success'
        });
        mutate();
      } else {
        toast({
          title: message,
          status: 'error'
        });
      }
    } catch (error) {
      setFlag.off();
    }
  }, [code, onClose, mutate, setCode, toast, setFlag]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { data, size, setSize, isValidating } = useSWRInfinite(
    (index: number) => {
      return userInfo && account.address
        ? `${REQUEST_API.spreadList}?page=${index + 1}&limit=10&address=${
            account.address
          }`
        : null;
    },
    url =>
      ajaxGet<{
        code: number;
        data: { list: any[] };
      }>(url as axiosUrlType, {
        limit: 10
      })
  );

  const isEnd = useMemo(
    () => (data ? data?.[data?.length - 1]?.data.list?.length < 10 : false),
    [data]
  );

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      const isBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 50;
      if (isBottom && !isValidating && !isEnd) {
        setSize(size + 1);
      }
    }
  }, [size, isEnd, setSize, isValidating]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [containerRef, handleScroll]);

  const { container, child } = useListVariant(0.05);

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
        <NECModal
          autoFocus={false}
          closeOnOverlayClick={false}
          header={() => 'Bind the invitation code'}
          isOpen={isOpen}
          onClose={onClose}
          showClose
          size={'sm'}
        >
          <Box>
            <Input
              _focusVisible={{
                borderColor: 'white',
                boxShadow: 'none'
              }}
              borderColor={'whiteAlpha.100'}
              h={'42px'}
              mb={'60px'}
              mt={'7.5'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCode(e.target.value)
              }
              placeholder="Enter invitation code"
              value={code}
              variant={'outline'}
              w={'full'}
            />
            <Flex gap={3}>
              <Button
                colorScheme="white"
                onClick={onClose}
                size={'lg'}
                variant={'outline'}
                w={'full'}
              >
                Cancel
              </Button>
              <Button
                isDisabled={!code}
                isLoading={flag}
                onClick={handleBind}
                size={'lg'}
                variant={'solid'}
                w={'full'}
              >
                Confirm
              </Button>
            </Flex>
          </Box>
        </NECModal>
        <Box
          h={'full'}
          pb={'148'}
          pt={128}
        >
          <Flex
            backdropBlur={'7.5px'}
            bg={'rgba(5, 5, 5, 0.90)'}
            border={'1px solid'}
            borderColor={'whiteAlpha.100'}
            borderRadius={'4xl'}
            boxShadow={
              '0px 37.5px 75px 0px rgba(255, 255, 255, 0.15) inset, 0px 3.75px 7.5px 0px rgba(0, 0, 0, 0.05), 0px 11.25px 22.5px 0px rgba(0, 0, 0, 0.05), 0px 22.5px 45px 0px rgba(0, 0, 0, 0.10)'
            }
            flexDir={'column'}
            h={'full'}
            mixBlendMode={'screen'}
            pos={'relative'}
            w={'full'}
          >
            {/* <Box
            bg="linear-gradient(135deg, rgba(23, 106, 177, 0.40) 0%, rgba(203, 216, 241, 0.40) 100%)"
            borderRadius={'full'}
            filter={'blur(75px)'}
            height={'790px'}
            left={'208px'}
            mixBlendMode={'screen'}
            pos={'absolute'}
            top={'4px'}
            w={'790px'}
            zIndex={'hide'}
          ></Box>
          <Box
            bg=" linear-gradient(135deg, rgba(101, 98, 251, 0.62) 0%, rgba(62, 44, 112, 0.35) 50%, rgba(32, 22, 68, 0.80) 100%)"
            borderRadius={'full'}
            filter={'blur(75px)'}
            height={'698px'}
            left={'254px'}
            pos={'absolute'}
            top={'4px'}
            w={'698px'}
            zIndex={'hide'}
          ></Box> */}

            <Center
              gap={2}
              justifyContent={'flex-start'}
              minH={'16'}
              pl={'22px'}
            >
              <IconSvg
                boxSize={'4'}
                name="menu"
              />
              <Text
                fontFamily={'day'}
                fontSize={'md'}
              >
                Invitation
              </Text>
            </Center>
            <Divider
              colorScheme={'whiteAlpha'}
              opacity={'0.1'}
            />

            <Flex
              flex={1}
              flexDir={'column'}
              overflow={'hidden'}
              px={6}
            >
              {userInfo && (
                <Flex
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  minH={'100'}
                >
                  <Flex gap={5}>
                    <Text>My invitation code: {userInfo?.invitation_code}</Text>
                    <Copy text={inviteLink} />
                  </Flex>
                  {!userInfo?.is_bind && (
                    <Button
                      backdropBlur={'10px'}
                      borderColor={'rgba(39, 55, 207, 0.40)'}
                      onClick={() => onOpen()}
                      variant={'solid'}
                      w={'214px'}
                    >
                      Bind invitation code
                    </Button>
                  )}
                </Flex>
              )}
              <Flex
                alignItems={'center'}
                bg={'whiteAlpha.200'}
                border={'1px'}
                borderColor={'whiteAlpha.100'}
                borderRadius={'42'}
                fontSize={'sm'}
                justifyContent={'space-between'}
                minH={42}
                px={10}
              >
                <Text>Address</Text>
                <Text>Invited Time</Text>
              </Flex>
              <LoadDataContainer
                isNoData={
                  !userInfo || !data?.length || !data[0]?.data?.list?.length
                }
              >
                <ChakraMotionBox
                  __css={{
                    '&::-webkit-scrollbar': {
                      width: 0
                    }
                  }}
                  animate={data?.length ? 'show' : 'hidden'}
                  className=" gap-5"
                  display={'flex'}
                  flex={1}
                  flexDir={'column'}
                  gap={5}
                  initial="hidden"
                  overflowY={'auto'}
                  py={5}
                  variants={container}
                >
                  {data?.map(item => {
                    return item?.data?.list?.map((item: InvitaProps) => {
                      return (
                        <ChakraMotionBox
                          alignItems={'center'}
                          display={'flex'}
                          fontSize={'sm'}
                          justifyContent={'space-between'}
                          key={`${item.uid}`}
                          lineHeight={1.5}
                          px={10}
                          py={2.5}
                          variants={child}
                        >
                          <Text>{item.nickname}</Text>
                          <Text>{item.spread_time}</Text>
                        </ChakraMotionBox>
                      );
                    });
                  })}
                </ChakraMotionBox>
              </LoadDataContainer>
            </Flex>
          </Flex>
        </Box>
      </ContentContainer>
    </Box>
  );
};

export default Invitation;
