import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  BIRDGE_TYPE,
  ChainId,
  ENV_KEY,
  swapChainList,
  TokenInfo,
  TokenList
} from '@/constants';

const BirdgeContext = createContext<{
  birdegType: BIRDGE_TYPE;
  chain: ChainId;
  symbol: TokenInfo;
  tokenList: TokenInfo[];
  changeSymbol: (symbol: TokenInfo) => void;
  changeChain: (chain: ChainId) => void;
  changeBirdegType: (type: BIRDGE_TYPE) => void;
}>({
  birdegType: 0,
  chain: ChainId.MAINNET,
  symbol: TokenList[0],
  tokenList: [],
  changeSymbol: () => {},
  changeChain: () => {},
  changeBirdegType: () => {}
});

export default BirdgeContext;

export const useBirdgeContext = () => {
  return useContext(BirdgeContext);
};

export const useBirdgeProvider = () => {
  const [birdegType, setBirdegType] = useState(BIRDGE_TYPE.DEPOST);
  const [chain, setChain] = useState(swapChainList[0].id);

  const tokenList = useMemo(() => {
    let list = TokenList.filter(item => item.id === chain);
    if (birdegType) {
      list = list.map(item => ({
        ...item,
        address: item.NECAddres,
        id: ENV_KEY === 'production' ? ChainId.BCCMAINNET : ChainId.BCCTESTNET
      }));
    }

    return list;
  }, [chain, birdegType]);

  const [symbol, setSymbol] = useState(tokenList[0]);

  const changeBirdegType = useCallback(
    (type: BIRDGE_TYPE) => {
      setBirdegType(type);
    },
    [setBirdegType]
  );

  const changeSymbol = useCallback((token: TokenInfo) => {
    setSymbol(token);
  }, []);

  const changeChain = useCallback(
    (chain: ChainId) => {
      setChain(chain);
    },
    [setChain]
  );

  useEffect(() => {
    chain && changeSymbol(tokenList[0]);
  }, [chain, changeSymbol, tokenList]);

  return {
    birdegType,
    changeBirdegType,
    chain,
    changeChain,
    tokenList,
    symbol,
    changeSymbol
  };
};
