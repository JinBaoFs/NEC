import { bsc, bscTestnet, mainnet, sepolia } from 'viem/chains';
import { Chain } from '@rainbow-me/rainbowkit';
import { ChainId } from '@/constants';
import { BCC_CHAIN, BCC_TEST_CHAIN } from '@/constants/chain';

export function toFixedDown(num: number | string, decimals = 2): string {
  const isString = typeof num === 'string';
  if (isString) {
    num = Number(num);
  }
  if (!num) return Number(num || 0).toFixed(decimals);
  const multiplier = 10 ** (decimals - 3);
  const result =
    Math.floor((num as number) * 1000 * multiplier) / (multiplier * 10 ** 3);
  return result.toFixed(decimals);
}

export function hideBitcoinAddress(address: string): string {
  if (address.length < 8) {
    return address;
  }
  return `${address.substring(0, 4)}....${address.substring(
    address.length - 4
  )}`;
}

export function truncateString(str: string): string {
  if (!str) return '';
  if (str.length <= 20) {
    return str;
  } else {
    const frontPart = str.slice(0, 6);
    const endPart = str.slice(-4);
    return frontPart + '....' + endPart;
  }
}

export function formatNumberWithCommas(number: number | string): string {
  return Number(number).toLocaleString(
    'en-US'
    // , { maximumFractionDigits: 2 }
  );
}

const ETHERSCAN_PREFIXES: { [chainId in ChainId]?: Chain } = {
  [ChainId.MAINNET]: mainnet,
  [ChainId.SEPILIA]: sepolia,
  // 3: 'ropsten.',
  // 4: 'rinkeby.',
  // 5: 'goerli.',
  // 42: 'kovan.',
  [ChainId.BSCTESTNET]: bscTestnet,
  [ChainId.BSCMAINNET]: bsc,
  [ChainId.BCCMAINNET]: BCC_CHAIN,
  [ChainId.BCCTESTNET]: BCC_TEST_CHAIN

  // 65: '',
  // 66: '',
  // STT: '',
  // DOGE: '',
  // [ChainId.NEC]: NERUALAND_CHAIN,
};

export function getEtherscanLink(
  chainId: ChainId,
  data: string,
  type: 'transaction' | 'token' | 'address'
): string {
  let prefix;

  if (chainId === ChainId.DOGE) {
    prefix = 'https://www.oklink.com/doge';
  } else if (chainId === ChainId.STT) {
    const url = 'https://statter.io/Explorer/#/';
    return `${url}${
      type === 'transaction' ? 'trade/trxDetail' : 'addressDetail/index'
    }?hash=${data}`;
  } else {
    prefix =
      ETHERSCAN_PREFIXES[chainId || ChainId.MAINNET]?.blockExplorers?.default
        .url;
  }

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`;
    }
    case 'token': {
      return `${prefix}/token/${data}`;
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}

export const formatNumber = (value: number, digits = 2): string => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
};
