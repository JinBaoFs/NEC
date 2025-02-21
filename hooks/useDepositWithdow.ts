import { useAccount, useSendTransaction, useWriteContract } from 'wagmi';
import { erc20Abi, formatUnits, Hash, parseEther, parseUnits } from 'viem';
import { useCallback, useMemo, useState } from 'react';
import { useBoolean } from '@chakra-ui/react';
import useSWR from 'swr';
import { useBirdgeContext } from '@/context/bridge';
import { useSingleCallResult } from '@/state/multicall/hooks';
import { toFixedDown } from '@/lib';
import { ChainId, Chains, Decimal, otherChains } from '@/constants';
import { NERC20ABI } from '@/constants/abi/NERC20';
import { NUSDTABI } from '@/constants/abi/NUSDT';

import { useWalletInfo } from '@/state/userInfo/hook';
import { ajaxGet } from '@/api/axios';
import REQUEST_API from '@/api/api';
import { axiosUrlType } from '@/api/type';
import { ConfigProps, WalletInfo } from '@/types/global';
import useNetworkError from './useNetworkError';
import { useNativeBalance } from './useBalance';

const useDepositWithdow = () => {
  const { address } = useAccount();
  const [val, setVal] = useState('');
  const [withdrawAddress, setWithDrawAddress] = useState('');
  const walletInfo = useWalletInfo();
  const {
    tokenList,
    birdegType,
    changeSymbol,
    changeChain,
    symbol,
    chain,
    changeBirdegType
  } = useBirdgeContext();

  const { data: config } = useSWR<ConfigProps>(
    REQUEST_API.config,
    url => ajaxGet(url as axiosUrlType),
    {
      revalidateOnFocus: false
    }
  );

  const isNetwork = useNetworkError();

  const data = useNativeBalance();

  const [flag, setFlag] = useBoolean();

  const { sendTransactionAsync } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();

  const _data = useSingleCallResult({
    abi: erc20Abi,
    address: symbol.address as Hash,
    functionName: 'balanceOf',
    args: [address as Hash]
  });

  const balance = useMemo<{
    bal: bigint;
    text: string;
  }>(() => {
    if (!isNetwork)
      return {
        bal: 0n,
        text: Number(0).toFixed(Decimal)
      };
    const bal = ((symbol.address ? _data?.result : data) as bigint) || 0n;

    return {
      bal,
      text: toFixedDown(
        formatUnits(
          bal,
          [ChainId.MAINNET].includes(chain as ChainId) &&
            symbol.symbol === 'USDT'
            ? 6
            : 18
        ),
        Decimal
      )
    };
  }, [symbol, _data, data, chain, isNetwork]);

  const handleMax = useCallback(() => {
    setVal(balance.text);
  }, [balance]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target && /^\d*\.?\d{0,5}$/.test(e.target.value)) {
        setVal(e.target.value);
      }
    },
    [setVal]
  );

  const isOther = useMemo(
    () => otherChains.includes(chain as ChainId),
    [chain]
  );
  const deposit = useCallback(async () => {
    const key = `evm_${Chains[
      chain
    ].icon.toLocaleLowerCase()}_account` as keyof WalletInfo;
    try {
      setFlag.on();
      if (symbol.address) {
        await writeContractAsync({
          address: symbol.address as Hash,
          abi: erc20Abi,
          functionName: 'transfer',
          args: [
            walletInfo[key] as Hash,
            parseUnits(
              val,
              [ChainId.MAINNET].includes(chain as ChainId) ? 6 : 18
            )
          ]
        });
      } else {
        await sendTransactionAsync({
          to: walletInfo[key] as Hash,
          value: parseEther(val)
        });
      }
      setFlag.off();
      setVal('');
    } catch (error) {
      console.log(error);

      setFlag.off();
      setVal('');
    }
  }, [
    chain,
    val,
    setFlag,
    symbol,
    walletInfo,
    writeContractAsync,
    sendTransactionAsync
  ]);
  const withdraw = useCallback(async () => {
    const params: {
      [key: string]: any;
    } = {
      ETH: {
        abi: NERC20ABI,
        args: [parseEther(val), isOther ? withdrawAddress : (address as Hash)]
      },
      USDT: {
        abi: NUSDTABI,
        args: [
          [ChainId.MAINNET, ChainId.SEPILIA].includes(chain) ? 1 : 2,
          parseEther(val),
          address as Hash
        ]
      }
    };
    try {
      setFlag.on();

      await writeContractAsync({
        address: symbol.address as Hash,
        functionName: 'burn',
        ...(params[symbol.symbol] || params.ETH)
      });
      setFlag.off();
      setVal('');
    } catch (error) {
      console.log(error);

      setFlag.off();
      setVal('');
    }
  }, [
    symbol,
    isOther,
    withdrawAddress,
    setFlag,
    address,
    val,
    chain,
    writeContractAsync
  ]);

  const btnInfo = useMemo(() => {
    if ((!birdegType && !isOther) || birdegType) {
      if (!+val)
        return {
          text: 'Enter amount',
          status: true
        };
      if (+val > +balance.text) {
        return {
          text: 'Insufficient balance',
          status: true
        };
      }
    }

    if (!birdegType && !isOther) {
      if (+val < 0.01) {
        return {
          text: 'Minimum amount 0.01',
          status: true
        };
      }

      if (+val > 2000000) {
        return {
          text: 'Maximum amount 2000000',
          status: true
        };
      }
    }

    if (birdegType && config) {
      const min =
        +config[
          `${symbol.symbol.toLocaleLowerCase()}_min` as keyof ConfigProps
        ];
      if (+val < min) {
        return {
          text: `Minimum amount ${min}`,
          status: true
        };
      }
    }

    if (birdegType && isOther) {
      if (!withdrawAddress) {
        return {
          text: 'Enter recipient address',
          status: true
        };
      }
      if (withdrawAddress) {
        if (
          symbol.symbol === 'DOGE' &&
          (withdrawAddress.indexOf('doge') !== 0 ||
            withdrawAddress.length !== 34)
        ) {
          return {
            text: 'Format error of address',
            status: true
          };
        }

        if (
          symbol.symbol === 'STT' &&
          (withdrawAddress.indexOf('stt') !== 0 ||
            withdrawAddress.length !== 35)
        ) {
          return {
            text: 'Format error of address',
            status: true
          };
        }
      }
    }

    return {
      text: birdegType ? 'Withdraw' : 'Deposit',
      status: false
    };
  }, [val, balance, isOther, config, symbol, withdrawAddress, birdegType]);

  const DepositSTTDOGEAddress = useMemo(() => {
    if (!walletInfo || !symbol.symbol) return '';

    return walletInfo[
      symbol.symbol === 'DOGE' ? 'doge_account' : 'stt_account'
    ];
  }, [walletInfo, symbol]);

  return {
    tokenList,
    symbol,
    chain,
    changeBirdegType,
    birdegType,
    changeSymbol,
    changeChain,
    balance,
    onChange,
    deposit,
    withdraw,
    val,
    handleMax,
    btnInfo,
    flag,
    withdrawAddress,
    setWithDrawAddress,
    DepositSTTDOGEAddress,
    config
  };
};
export default useDepositWithdow;
