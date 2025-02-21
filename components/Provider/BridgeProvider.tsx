import { BridgeContext } from '@/context';
import { useBirdgeProvider } from '@/context/bridge';

const BridgeProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    birdegType,
    changeBirdegType,
    chain,
    changeChain,
    tokenList,
    symbol,
    changeSymbol
  } = useBirdgeProvider();

  return (
    <BridgeContext.Provider
      value={{
        birdegType,
        changeBirdegType,
        chain,
        symbol,
        changeChain,
        tokenList,
        changeSymbol
      }}
    >
      {children}
    </BridgeContext.Provider>
  );
};

export default BridgeProvider;
