import { Chain } from '@rainbow-me/rainbowkit';

export const BCC_CHAIN = {
  id: 3020,
  name: 'Boundary Chain',
  iconUrl: '/assets/img/BCC.png',
  nativeCurrency: {
    decimals: 18,
    name: 'BCC',
    symbol: 'BCC'
  },
  rpcUrls: {
    default: { http: ['https://bccrpc.beyondcurrencycoin.io'] }
  },
  blockExplorers: {
    default: {
      name: 'BCCScan',
      url: 'https://bccscan-api.beyondcurrencycoin.io/',
      apiUrl: 'https://bccscan-api.beyondcurrencycoin.io/api'
    }
  },
  contracts: {
    multicall3: {
      address: '0xc5Ea190b19972aaA33BFB6b773e015Db79b847Af'
    }
  },
  testnet: true
} as const satisfies Chain;

export const BCC_TEST_CHAIN = {
  id: 3004,
  name: 'Boundary Test Chain',
  iconUrl: '/assets/img/BCC.png',
  nativeCurrency: {
    decimals: 18,
    name: 'BCC',
    symbol: 'BCC'
  },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.beyondcurrencycoin.io'] }
  },
  blockExplorers: {
    default: {
      name: 'BCCScan',
      url: 'https://testnet-scan-api.beyondcurrencycoin.io',
      apiUrl: 'https://testnet-scan-api.beyondcurrencycoin.io/api'
    }
  },
  contracts: {
    multicall3: {
      address: '0xED926d25521DA2639b9FfFf88985bbE29cbc4CaB'
    }
  },
  testnet: true
} as const satisfies Chain;

export const SPEOLIA_CHAIN = {
  id: 11155111,
  name: 'Sepolia',
  nativeCurrency: { name: 'Sepolia Ether', symbol: 'SEP', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://ethereum-sepolia-rpc.publicnode.com']
    }
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://sepolia.etherscan.io',
      apiUrl: 'https://api-sepolia.etherscan.io/api'
    }
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 751532
    },
    ensRegistry: { address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' },
    ensUniversalResolver: {
      address: '0xBaBC7678D7A63104f1658c11D6AE9A21cdA09725',
      blockCreated: 5_043_334
    }
  },
  testnet: true
} as const satisfies Chain;
