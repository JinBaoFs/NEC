import { Hash } from 'viem';
import { ChakraStylesConfig } from 'chakra-react-select';
import { PropsConfigs } from 'chakra-dayzed-datepicker/dist/utils/commonTypes';
import { IconName } from '@/components/IconSvg';
import { ENV_KEY_TYPE } from '@/types/global';

/* javascript-obfuscator:disable */
export const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL as string;

export const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_URL as string;
export const TWITTER_URL = process.env.NEXT_PUBLIC_TWITTER_URL as string;
export const MEDIUM_URL = process.env.NEXT_PUBLIC_MEDIUM_URL as string;
export const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL as string;
export const ENV_KEY = process.env.NEXT_PUBLIC_ENV_KEY as ENV_KEY_TYPE;
/* javascript-obfuscator:enable */

export const MAX_UNIT256 = BigInt(
  '57896044618658097711785492504343953926634992332820282019728792003956564819967'
);

export const APPROVE_AMOUNT = BigInt(100000000000 * Math.pow(10, 18));

export const SignMessageStr = 'Welcome To Boundary';

export enum ChainId {
  MAINNET = 1,
  SEPILIA = 11155111,
  // ROPSTEN = 3,
  // RINKEBY = 4,
  // GÖRLI = 5,
  // KOVAN = 42,
  BSCMAINNET = 56,
  BSCTESTNET = 97,
  // OKEX = 66,
  // OKEX_TESTNET = 65,
  STT = 'STT',
  DOGE = 'DOGE',
  // NECTESTNET = 4428,
  // NEC = 4429,
  BCCMAINNET = 3020,
  BCCTESTNET = 3004
}

export enum AUTHTYPE {
  NOAUTH = 0,
  AUTHING = 1,
  AUTH = 2
}

export enum ASSET_STATUS {
  PRE_SALE = 1,
  SALE = 2
}

export enum BIRDGE_TYPE {
  DEPOST,
  WITHDEAW
}

export interface ChainInfo {
  name: string;
  id: ChainId;
  icon: IconName | 'STT' | 'DOGE';
}

export const Decimal = 5;

export const Chains: {
  [key in ChainId]: ChainInfo;
} = {
  [ChainId.MAINNET]: {
    name: 'Ethereum Mainnet',
    id: ChainId.MAINNET,
    icon: 'ETH'
  },
  [ChainId.SEPILIA]: {
    name: 'Sepolia Mainnet',
    id: ChainId.SEPILIA,
    icon: 'ETH'
  },
  [ChainId.BSCMAINNET]: {
    name: 'BNB Chain',
    id: ChainId.BSCMAINNET,
    icon: 'BNB'
  },
  [ChainId.BSCTESTNET]: {
    name: 'BNB Test Chain',
    id: ChainId.BSCTESTNET,
    icon: 'BNB'
  },
  [ChainId.DOGE]: {
    name: 'DogeCoin',
    id: ChainId.DOGE,
    icon: 'DOGE'
  },
  [ChainId.STT]: {
    name: 'Statter Network',
    id: ChainId.STT,
    icon: 'STT'
  },
  [ChainId.BCCMAINNET]: {
    name: 'Boundary',
    id: ChainId.BCCMAINNET,
    icon: 'BCC'
  },
  [ChainId.BCCTESTNET]: {
    name: 'Boundary',
    id: ChainId.BCCTESTNET,
    icon: 'BCC'
  }
  // [ChainId.NECTESTNET]: {
  //   name: 'NEURA.LAND',
  //   id: ChainId.NECTESTNET,
  //   icon: 'NEC'
  // },
  // [ChainId.NEC]: {
  //   name: 'NEURA.LAND',
  //   id: ChainId.NEC,
  //   icon: 'NEC'
  // }
};

export const otherChains: ChainId[] = [ChainId.STT, ChainId.DOGE];

export const swapChainList: ChainInfo[] =
  ENV_KEY === 'production'
    ? [
        Chains[ChainId.MAINNET],
        Chains[ChainId.BSCMAINNET]
        // Chains[ChainId.DOGE],
        // Chains[ChainId.STT]
      ]
    : [
        Chains[ChainId.SEPILIA],
        Chains[ChainId.BSCTESTNET]
        // Chains[ChainId.DOGE],
        // Chains[ChainId.STT]
      ];

export const currentChain: ChainInfo =
  Chains[ENV_KEY === 'production' ? ChainId.BCCMAINNET : ChainId.BCCTESTNET];

export interface TokenInfo {
  id: ChainId;
  name: string;
  symbol: string;
  symbolName: string;
  icon: IconName | 'STT' | 'DOGE';
  address?: Hash;
  NECAddres: Hash;
}

export const TokenList: TokenInfo[] = [
  {
    id: ChainId.MAINNET,
    name: 'ETH Token',
    symbol: 'ETH',
    symbolName: 'WETH',
    icon: 'ETH',
    NECAddres: '0xD8AF8Ffeb79DCEd24c717e15B8eDEF8B58E79418'
  },
  {
    id: ChainId.MAINNET,
    name: 'USDT Token',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    symbol: 'USDT',
    symbolName: 'WUSDT',
    icon: 'USDT',
    NECAddres: '0xB228a19d59238ACC3e6eEC0Df1CB73aEDcd2BE02' // WUSDT
  },
  {
    id: ChainId.SEPILIA,
    name: 'ETH Token',
    symbol: 'ETH',
    icon: 'ETH',
    symbolName: 'WETH',
    NECAddres: '0xc5Ea190b19972aaA33BFB6b773e015Db79b847Af'
  },
  {
    id: ChainId.SEPILIA,
    name: 'USDT Token',
    address: '0xb0f0F783b2A9ef6D890407c26eB2D10cF5822f68',
    symbol: 'USDT',
    symbolName: 'WUSDT',
    icon: 'USDT',
    NECAddres: '0xD0bc8E86cd94190CFD1ac2BeDeb9Aa303bdc905b'
  },
  {
    id: ChainId.BSCMAINNET,
    name: 'BNB Token',
    symbol: 'BNB',
    symbolName: 'WBNB',
    icon: 'BNB',
    NECAddres: '0x0266A63cE4aEEE202AbD01C201876D7A1d861032'
  },
  {
    id: ChainId.BSCMAINNET,
    name: 'USDT Token',
    address: '0x55d398326f99059ff775485246999027b3197955',
    symbol: 'USDT',
    symbolName: 'WUSDT',
    icon: 'USDT',
    NECAddres: '0xB228a19d59238ACC3e6eEC0Df1CB73aEDcd2BE02'
  },
  {
    id: ChainId.BSCTESTNET,
    name: 'BNB Token',
    symbol: 'BNB',
    icon: 'BNB',
    symbolName: 'WBNB',
    NECAddres: '0x0266A63cE4aEEE202AbD01C201876D7A1d861032'
  },
  {
    id: ChainId.BSCTESTNET,
    name: 'USDT Token',
    address: '0xa1cfbA056ff042341880790878ee9213216ec67A',
    symbol: 'USDT',
    symbolName: 'WUSDT',
    icon: 'USDT',
    NECAddres: '0xD0bc8E86cd94190CFD1ac2BeDeb9Aa303bdc905b'
  }
  // {
  //   id: ChainId.STT,
  //   name: 'STT Token',
  //   symbol: 'STT',
  //   icon: 'STT',
  //   symbolName: 'WSTT',
  //   NECAddres:
  //     ENV_KEY === 'production'
  //       ? '0x523387889f80C640291Cd198Ba1A9DA48B2E1059'
  //       : '0xB228a19d59238ACC3e6eEC0Df1CB73aEDcd2BE02'
  // },
  // {
  //   id: ChainId.DOGE,
  //   name: 'DOGE Token',
  //   symbol: 'DOGE',
  //   symbolName: 'WDOGE',
  //   icon: 'DOGE',
  //   NECAddres:
  //     ENV_KEY === 'production'
  //       ? '0x9E7290B542650bb89b2b968966F70515162bD6eB'
  //       : '0xc5Ea190b19972aaA33BFB6b773e015Db79b847Af'
  // }
];

export const datePickerPropsConfig: PropsConfigs = {
  dayOfMonthBtnProps: {
    defaultBtnProps: {
      color: 'white',
      _hover: {
        background: 'gray.700',
        color: 'white',
        borderRadius: '0'
      }
    },
    isInRangeBtnProps: {
      background: 'black.200',
      color: 'white',
      borderRadius: '0'
    },
    selectedBtnProps: {
      background: 'gray.700',
      borderRadius: '0',
      color: 'white'
    }
  },
  dateNavBtnProps: {
    borderRadius: 'lg',
    border: '1px solid',
    borderColor: 'transparent',
    color: 'white',
    _hover: {
      border: '1px solid',
      borderColor: 'black.400'
    },
    _focus: {
      bg: 'black.400'
    }
  },
  inputProps: {
    w: { base: 'full', md: '240px' },
    h: '40px',
    color: 'white',
    size: 'sm',
    border: '1px solid',
    padding: '4',
    borderColor: 'black.500',
    bg: 'gray.900',
    transitionDuration: 'normal',
    borderRadius: 'lg',
    placeholder: 'Select date range',
    _placeholder: {
      color: 'white'
    },
    _focusVisible: {
      borderColor: 'gray.300'
    }
  },
  popoverCompProps: {
    popoverContentProps: {
      zIndex: 'tooltip',
      color: 'white',
      bg: 'gray.900',
      borderColor: 'black.400'
    }
  },
  calendarPanelProps: {
    wrapperProps: {
      borderColor: 'red'
    },
    contentProps: {
      borderWidth: '0'
    },
    headerProps: {
      padding: '5px'
    },
    dividerProps: {
      display: 'none'
    }
  },
  weekdayLabelProps: {
    fontWeight: 'normal',
    mb: '4px'
  },
  dateHeadingProps: {
    fontWeight: 'semibold'
  }
};

export const chakraStyles: ChakraStylesConfig = {
  container: provided => {
    return {
      ...provided,
      bg: 'gray.900',
      border: '1px solid',
      borderColor: 'black.500',
      borderRadius: 'lg',
      w: { base: 'full', md: '184px' },
      transitionDuration: 'normal',
      _hover: {
        borderColor: 'gray.300'
      }
    };
  },
  control: provided => {
    return {
      ...provided,
      px: '4',
      borderColor: 'transparent',
      _focusVisible: {
        outline: 'none'
      }
    };
  },
  placeholder: provided => {
    return {
      ...provided,
      color: 'white'
    };
  },
  valueContainer: provided => {
    return {
      ...provided,
      pl: 4,
      color: 'white'
    };
  },
  menuList: provided => {
    return {
      ...provided,
      bg: 'gray.900',
      border: 'none',
      p: 2,
      py: 1
    };
  },
  option: (provided, state) => {
    return {
      ...provided,
      borderRadius: 'lg',
      bg:
        state.isFocused || state.isSelected ? 'black.300' : provided.background,
      mb: 2,
      color: 'white'
    };
  },
  dropdownIndicator: provided => {
    return {
      ...provided,
      p: 0
    };
  }
};
