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
    default: { http: ['https://bccrpc.boundarycoin.com'] }
  },
  blockExplorers: {
    default: {
      name: 'BCCScan',
      url: 'https://bccscan.beyondcurrencycoin.io',
      apiUrl: 'https://bccscan.beyondcurrencycoin.io'
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
  name: 'Boundary Chain',
  iconUrl: '/assets/img/BCC.png',
  nativeCurrency: {
    decimals: 18,
    name: 'BCC',
    symbol: 'BCC'
  },
  rpcUrls: {
    default: { http: ['https://rpc.boundarycoin.com'] }
  },
  blockExplorers: {
    default: {
      name: 'BCCScan',
      url: 'https://scan-api.boundarycoin.com',
      apiUrl: 'https://scan-api.boundarycoin.com/api'
    }
  },
  contracts: {
    multicall3: {
      address: '0xED926d25521DA2639b9FfFf88985bbE29cbc4CaB'
    }
  },
  testnet: true
} as const satisfies Chain;
