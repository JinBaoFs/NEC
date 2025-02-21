import { createAction } from '@reduxjs/toolkit';
import { WalletInfo } from '@/types/global';

export const userSignIn = createAction<{
  userInfo: any;
  token?: string;
}>('userInfo/signIn');

export const userSignOut = createAction('userInfo/SignOut');

export const updateIPStatus = createAction<{
  isDisabled: boolean;
}>('userInfo/updateIPStatus');

export const updateWalletInfo = createAction<WalletInfo>(
  'userInfo/updateWalletInfo'
);
