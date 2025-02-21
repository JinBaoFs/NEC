import { createReducer } from '@reduxjs/toolkit';
import { UserInfoType } from '@/types/global';
import { WalletInfo } from './../../types/global';
import {
  userSignIn,
  updateWalletInfo,
  userSignOut,
  updateIPStatus
} from './actions';

const initialState: {
  userInfo: UserInfoType | null;
  token: string;
  isDisabled?: boolean;
  walletInfo: WalletInfo;
} = {
  userInfo: null,
  token: '',
  walletInfo: {
    doge_account: '',
    stt_account: '',
    evm_eth_account: '',
    evm_bnb_account: ''
  }
};

export default createReducer(initialState, builder =>
  builder
    .addCase(userSignIn, (state, { payload }) => {
      state.userInfo = payload.userInfo;
      if (payload.token) state.token = payload.token;
    })
    .addCase(userSignOut, state => {
      state.userInfo = null;
      state.token = '';
    })
    .addCase(updateIPStatus, (state, { payload }) => {
      state.isDisabled = payload.isDisabled;
    })
    .addCase(updateWalletInfo, (state, { payload }) => {
      state.walletInfo = payload;
    })
);
