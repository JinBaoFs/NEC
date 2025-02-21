'use client';

import {
  Box,
  useDisclosure,
  Text,
  Button,
  Center,
  useBoolean
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect } from 'react';
import { useAccount, useAccountEffect, useSignMessage } from 'wagmi';
import { isAddressEqual } from 'viem';
import { ajaxPost } from '@/api/axios';
import {
  useUserSignIn,
  useUserInfo,
  useUserSignOut,
  useGetUserInfo
} from '@/state/userInfo/hook';
import { SignMessageStr } from '@/constants';
import NECModal from '../Modal';

const AuthModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [flag, setFlag] = useBoolean();
  const userInfo = useUserInfo();
  const signOut = useUserSignOut();
  const { signMessageAsync } = useSignMessage();
  const { address } = useAccount();
  const userSignIn = useUserSignIn();
  useGetUserInfo();
  const t = useTranslations();

  const signIn = useCallback(async () => {
    try {
      setFlag.on();
      const sign = await signMessageAsync({ message: SignMessageStr });

      const {
        status,
        data: { user, token }
      } = (await ajaxPost('login', {
        sign,
        account: address,
        message: SignMessageStr,
        invite_code: localStorage.getItem('inviteCode') || undefined
      })) as any;
      setFlag.off();
      onClose();
      if (status === 200) {
        userSignIn({
          userInfo: user,
          token
        });
      }
    } catch (error) {
      setFlag.off();
    }
  }, [signMessageAsync, onClose, userSignIn, address, setFlag]);

  useEffect(() => {
    ((address && !userInfo) ||
      (userInfo?.address &&
        address &&
        !isAddressEqual(userInfo.address, address))) &&
      onOpen();
  }, [address, userInfo, onOpen]);

  useAccountEffect({
    onDisconnect() {
      signOut();
    }
  });

  return (
    <NECModal
      autoFocus={false}
      closeOnOverlayClick={false}
      header={() => SignMessageStr}
      isOpen={isOpen}
      onClose={onClose}
      showClose
      size={'sm'}
    >
      <Box>
        <Center
          bg={'black.800'}
          borderRadius={'md'}
          flexDir={'column'}
          mb={7.5}
          px={4}
          py={2}
        >
          {/* <Text fontSize={'sm'}
            lineHeight={'4'}>{SignMessageStr}</Text> */}
          <Text
            color={'#fff'}
            fontSize={'xs'}
            lineHeight={'6'}
            textAlign={'center'}
          >
            {t('In order')}
          </Text>
        </Center>
        <Button
          isLoading={flag}
          onClick={signIn}
          size={'lg'}
          variant={'solid'}
          w={'full'}
        >
          {t('Sign in Wallet')}
        </Button>
      </Box>
    </NECModal>
  );
};

export default AuthModal;
