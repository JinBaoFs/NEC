import { useEffect } from 'react';
import { Hash } from 'viem';
import {
  useBlockNumber,
  useBalance as useBalanceWagmi,
  useAccount
} from 'wagmi';
import { useVisible } from './useVisible';

export const useNativeBalance = (address?: Hash) => {
  const { address: _address } = useAccount();
  const visible = useVisible();
  const { data: blockNumber } = useBlockNumber({ watch: visible });
  const { refetch, ...data } = useBalanceWagmi({
    address: address || _address
  });
  // console.log(data);

  useEffect(() => {
    refetch();
  }, [blockNumber, refetch]);
  return data.data?.value;
};
