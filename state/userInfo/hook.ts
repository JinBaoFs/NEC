import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { signOut, signIn } from 'next-auth/react';
import { useAccount } from 'wagmi';
import useSWR from 'swr';
import { UserInfoType, WalletInfo } from '@/types/global';
import { ajaxGet } from '@/api/axios';
import { axiosUrlType } from '@/api/type';
import { AppState, AppDispatch } from '..';
import {
  userSignIn,
  updateIPStatus,
  userSignOut,
  updateWalletInfo
} from './actions';

export const useGetUserInfo = () => {
  const userInfo = useUserInfo();
  const updateInfo = useUpdateInfo();
  const { data, mutate } = useSWR<UserInfoType>(
    userInfo ? 'getUserInfo' : '',
    (url: any) => ajaxGet(url as axiosUrlType)
  );

  useEffect(() => {
    data &&
      updateInfo({
        userInfo: data
      });
  }, [updateInfo, data]);
  return {
    mutate
  };
};

export const useUserInfo = () => {
  const { address } = useAccount();
  return useSelector((state: AppState) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userInfo } = state.userInfo;
    return address ? userInfo : null;
  });
};

export const useWalletInfo = () => {
  return useSelector((state: AppState) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { walletInfo } = state.userInfo;
    return walletInfo;
  });
};

export const useUserToken = () => {
  return useSelector((state: AppState) => {
    return state.userInfo.token;
  });
};

export const useUserSignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    ({ userInfo, token }: { userInfo: UserInfoType; token: string }) => {
      dispatch(
        userSignIn({
          userInfo,
          token
        })
      );
      signIn('credentials', {
        token,
        address: userInfo.address,
        redirect: false
        // callbackUrl: process.env.NEXT_PUBLIC_CALLBACKURL_URL
      });
    },
    [dispatch]
  );
};

export const useUpdateInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    ({ userInfo }: { userInfo: UserInfoType }) => {
      dispatch(
        userSignIn({
          userInfo
        })
      );
    },
    [dispatch]
  );
};

export const useUpdateWalletInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (payload: WalletInfo) => {
      dispatch(updateWalletInfo(payload));
    },
    [dispatch]
  );
};

export const useUserSignOut = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => {
    dispatch(userSignOut());
    signOut({
      redirect: false
    });
  }, [dispatch]);
};

export const useIPStatus = () => {
  return useSelector((state: AppState) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isDisabled } = state.userInfo;
    return isDisabled;
  });
};

export const useUpdateIPStatus = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    ({ isDisabled }: { isDisabled: boolean }) => {
      dispatch(
        updateIPStatus({
          isDisabled
        })
      );
    },
    [dispatch]
  );
};
