import { useMemo } from 'react';
import { useAccount, useChains } from 'wagmi';
import { ChainId, otherChains } from '@/constants';
import { useBirdgeContext } from '@/context/bridge';

const useIsChooseEVM = () => {
  const { birdegType, chain } = useBirdgeContext();
  return otherChains.includes(chain) && !birdegType;
};

const useNetworkError = () => {
  const { birdegType, chain } = useBirdgeContext();
  const chains = useChains();
  const account = useAccount();
  const isChooseEVM = useIsChooseEVM();
  const chainShowStatus = useMemo(() => {
    return chains.some(item => item.id === account.chainId);
  }, [chains, account]);

  if (isChooseEVM) return true;

  const isEVMChain = !otherChains.includes(account.chainId as ChainId);

  if (isEVMChain) {
    if (
      birdegType &&
      ![ChainId.BCCMAINNET, ChainId.BCCTESTNET].includes(
        account.chainId as ChainId
      )
    )
      return false;
    if (!birdegType && account.chainId !== chain) return false;
  }
  return chainShowStatus;
};

export default useNetworkError;
