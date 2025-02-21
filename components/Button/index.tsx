import { ButtonProps, Button as CButton } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { PropsWithChildren, useCallback } from 'react';
import { useAccount, useChains, useSwitchChain, useWalletClient } from 'wagmi';
import { Chain } from 'viem/chains';
import { useBirdgeContext } from '@/context/bridge';
import useNetworkError from '@/hooks/useNetworkError';
import { Chains, currentChain } from '@/constants';

const Button = ({
  children,
  onClick,
  ...boxProps
}: ButtonProps & PropsWithChildren & { onClick?: any }) => {
  const account = useAccount();
  const walletClient = useWalletClient();
  const chains = useChains();
  const t = useTranslations();
  const { openConnectModal } = useConnectModal();
  const { switchChainAsync } = useSwitchChain();
  const networkStatus = useNetworkError();

  const { birdegType, chain } = useBirdgeContext();
  const handle = useCallback(async () => {
    if (account.isDisconnected) {
      return openConnectModal?.();
    }
    if (!networkStatus) {
      const chainId = (
        birdegType ? currentChain.id : Chains[chain].id
      ) as number;

      try {
        await switchChainAsync?.({
          chainId
        });
      } catch (error) {
        walletClient.data?.addChain({
          chain: chains.find(item => item.id === currentChain.id) as Chain
        });
      }
      return;
    }
    onClick?.();
  }, [
    chains,
    account,
    switchChainAsync,
    networkStatus,
    birdegType,
    chain,
    openConnectModal,
    onClick,
    walletClient
  ]);

  const text = useCallback(() => {
    if (!networkStatus)
      return `Switch to ${birdegType ? currentChain.name : Chains[chain].name}`;
    return account.isDisconnected ? t('Connect Wallet') : children;
  }, [account, children, networkStatus, chain, birdegType, t]);

  return (
    <CButton
      onClick={handle}
      size={'lg'}
      variant={'solid'}
      {...boxProps}
      isDisabled={
        !networkStatus || account.isDisconnected ? false : boxProps.isDisabled
      }
    >
      {text()}
    </CButton>
  );
};

export default Button;
