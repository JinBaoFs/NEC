import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  trustWallet,
  argentWallet,
  walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets';
import { bsc, bscTestnet, mainnet } from 'viem/chains';
import { BCC_CHAIN, BCC_TEST_CHAIN, SPEOLIA_CHAIN } from './chain';
import { ENV_KEY } from '.';

export const config = getDefaultConfig({
  appName: 'Boundary',
  projectId: '7748b82ece2b86510b629efd07bb877a',
  ...(ENV_KEY === 'production'
    ? {
        chains: [BCC_CHAIN, mainnet, bsc]
      }
    : {
        chains: [BCC_TEST_CHAIN, SPEOLIA_CHAIN, bscTestnet]
      }),
  wallets: [
    {
      groupName: 'Popular',
      wallets: [
        injectedWallet,
        metaMaskWallet,
        // coinbaseWallet,
        walletConnectWallet,
        rainbowWallet
      ]
    },
    {
      groupName: 'Other',
      wallets: [trustWallet, argentWallet]
    }
  ],
  ssr: true
});

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 60 * 1000
//     }
//   }
// });
