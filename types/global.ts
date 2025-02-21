import { Hash } from 'viem';

export interface TokenCardPorps {
  name: string;
  address?: Hash;
  icon?: string;
  hiddenNameOfPending?: boolean;
  hiddenConfirmItem?: boolean;
}

export interface PortfolioItemProps {
  tokenName: string;
  data: string;
  tip: string;
  name: string;
  icon: string;
}

export interface TransactionItemProps {
  from_coin: string;
  to_coin: string;
  from_logo: string;
  to_logo: string;
  id: number;
  uid: number;
  address: string;
  type: number;
  usdt: string;
  usds: string;
  create_time: string;
  hash: string;
  coin: string;
  cid: null;
}

export interface JoinUserInfo {
  uid: number;
  nickname: string;
  spread_address: string;
  create_time: string;
}

export interface airdropUserInfo {
  rank_id: number;
  uid: number;
  nickname: string;
  spread_address: string;
  points: string;
  isOwner: boolean;
}

export interface WalletInfo {
  doge_account: string;
  stt_account: string;
  evm_eth_account: string;
  evm_bnb_account: string;
}

export interface TableLIst<T> {
  list: T[];
  count: number;
}

export interface InvitaProps {
  uid: number;
  nickname: string;
  spread_time: string;
}

export interface UserInfoType {
  uid: number;
  address: Hash;
  last_time: string;
  last_ip: string;
  status: number;
  spread_uid: number;
  invitation_code: string;
  create_time: string;
  bnb_address: null;
  stt_address: null;
  points: null;
  nld_address: null;
  spread_team_count: number;
  usdt: string;
  team_usdt: string;
  spread_count: number;
  nickname: string;
  cycle_points: string;
  ladder_points: string;
  invite_points: string;
  is_bind: number;
}

export interface HistoryProps {
  extract_id: number;
  amount: string;
  coin: string;
  status_two: string;
  type: number;
}

export interface HistoryDetailProps {
  from_address: string;
  to_address: string;
  amount: string;
  status_one: number;
  status_two: string;
  hash1: string;
  hash2: string;
  coin: string;
  from_chain: string;
  to_chain: string;
  type: number;
}

export interface ConfigProps {
  tvl: number;
  user_count: number;
  eth_min: string;
  bnb_min: string;
  doge_min: string;
  usdt_min: string;
  stt_min: string;
  eth_fee: string;
  bnb_fee: string;
  doge_fee: string;
  usdt_fee: string;
  stt_fee: string;
}

export type ENV_KEY_TYPE = 'production' | 'develop' | 'test';
