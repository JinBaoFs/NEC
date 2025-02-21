'use client';
import {
  Box,
  Text,
  HStack,
  Flex,
  Center,
  Input,
  Button,
  TableContainer,
  VStack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
  useBoolean,
  Spinner,
  Skeleton,
  BoxProps,
  Tooltip
} from '@chakra-ui/react';
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import QRCode from 'react-qr-code';
import React from 'react';
import { useAccount, useChainId, useSwitchChain, useWalletClient } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import useSWR from 'swr';
import { AnimatePresence, motion } from 'framer-motion';
import { Hash } from 'viem';
import ContentContainer from '@/components/ContentContainer';
import CButton from '@/components/Button';

import IconSvg, { IconName } from '@/components/IconSvg';
import LoadDataContainer from '@/components/LoadDataContainer';
import { BgCard } from '@/components/FilterCard';
import NECModal from '@/components/Modal';
import { Copy } from '@/components/Copy';
import useDepositWithdow from '@/hooks/useDepositWithdow';
import {
  ChainId,
  ChainInfo,
  Chains,
  currentChain,
  ENV_KEY,
  otherChains,
  swapChainList,
  TokenInfo
} from '@/constants';
import { useBirdgeContext } from '@/context/bridge';
import { BridgeProvider } from '@/components/Provider';
import REQUEST_API from '@/api/api';
import { ajaxGet } from '@/api/axios';
import { axiosUrlType } from '@/api/type';
import {
  ConfigProps,
  HistoryDetailProps,
  HistoryProps,
  WalletInfo
} from '@/types/global';
import { useUpdateWalletInfo, useUserInfo } from '@/state/userInfo/hook';
import ChakraMotionBox from '@/components/ChakraMotionBox';
import { useIsMounted } from '@/hooks/useIsMounted';
import { getEtherscanLink } from '@/lib';
import { useOrderInfoVariant } from '@/hooks/variant';

const Dots = () => {
  return (
    <HStack gap={'2.5'}>
      {new Array(3).fill(0).map((_, index) => {
        return (
          <Box
            bg={`${index % 2 === 0 ? 'white' : '#252525'}`}
            borderRadius={'full'}
            borderRight={'50%'}
            h={'5px'}
            key={index}
            w={'5px'}
          />
        );
      })}
    </HStack>
  );
};

const BirdegHeader = () => {
  return (
    <HStack
      justifyContent={'center'}
      my={'26px'}
    >
      <Dots />
      <Text>YOU CAN BRIDGE</Text>
      <Dots />
    </HStack>
  );
};

const OrderChildMotion = ({
  children,
  ...boxProps
}: PropsWithChildren & BoxProps) => {
  const { child } = useOrderInfoVariant(0.075);
  return (
    <ChakraMotionBox
      variants={child}
      {...boxProps}
    >
      {children}
    </ChakraMotionBox>
  );
};

const OrderInfo = React.forwardRef(
  (
    { flag, close, id }: { flag: boolean; id: number; close: () => void },
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const [data, setData] = useState<HistoryDetailProps | undefined>();
    const { data: _data } = useSWR<HistoryDetailProps>(
      flag ? `${REQUEST_API.detail}/${id}` : null,
      url => ajaxGet(url as axiosUrlType),
      {
        revalidateOnFocus: false
      }
    );
    useEffect(() => {
      _data && setData(_data);
      if (!flag) {
        setTimeout(() => {
          setData(undefined);
        }, 200);
      }
    }, [_data, flag, setData]);

    const status = useMemo<{ [key: string]: string }>(() => {
      return {
        0: 'Processing',
        1: 'Execution',
        2: 'Success'
      };
    }, []);

    const chains: { [key: string]: ChainId } = useMemo(
      () => ({
        ETH: ENV_KEY === 'production' ? ChainId.MAINNET : ChainId.SEPILIA,
        BNB: ENV_KEY === 'production' ? ChainId.BSCMAINNET : ChainId.BSCTESTNET,
        STT: ChainId.STT,
        DOGE: ChainId.DOGE,
        BCC: ENV_KEY === 'production' ? ChainId.BCCMAINNET : ChainId.BCCTESTNET
      }),
      []
    );

    const openLink = useCallback(
      (chainId: string, data: Hash) => {
        window.open(getEtherscanLink(chains[chainId], data, 'transaction'));
      },
      [chains]
    );

    const { container } = useOrderInfoVariant(0.075);

    return (
      <ChakraMotionBox
        alignItems={'center'}
        animate={flag ? 'show' : 'hidden'}
        bg={'rgba(5, 5, 5, 1)'}
        borderRadius={'xl'}
        boxShadow={
          '0px 37.5px 75px 0px rgba(255, 255, 255, 0.15) inset, 0px 3.75px 7.5px 0px rgba(0, 0, 0, 0.05), 0px 11.25px 22.5px 0px rgba(0, 0, 0, 0.05), 0px 22.5px 45px 0px rgba(0, 0, 0, 0.10)'
        }
        display={'flex'}
        exit="hidden"
        flexDir={'column'}
        h={'full'}
        initial="hidden"
        left={0}
        pos={'relative'}
        position={'absolute'}
        ref={ref}
        top={0}
        variants={container}
        w={'full'}
        zIndex={flag ? 1 : 'hide'}
      >
        <IconSvg
          boxSize={'18'}
          color={'whiteAlpha.800'}
          cursor={'pointer'}
          name="close"
          onClick={close}
          pos={'absolute'}
          right={7.5}
          top={4}
        />
        <OrderChildMotion>
          <Center flexDir={'column'}>
            {(data?.status_two as string) === '2' ? (
              <motion.svg
                className={' mt-[94px]'}
                fill="none"
                height="56"
                viewBox="0 0 56 56"
                width="56"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M28.0003 51.3333C34.4436 51.3333 40.2769 48.7216 44.4994 44.4991C48.722 40.2766 51.3337 34.4432 51.3337 28C51.3337 21.5567 48.722 15.7234 44.4994 11.5008C40.2769 7.2783 34.4436 4.66663 28.0003 4.66663C21.5571 4.66663 15.7237 7.2783 11.5012 11.5008C7.27867 15.7234 4.66699 21.5567 4.66699 28C4.66699 34.4432 7.27867 40.2766 11.5012 44.4991C15.7237 48.7216 21.5571 51.3333 28.0003 51.3333Z"
                  fill="#2CCDB0"
                />
                <motion.path
                  animate={{ pathLength: 1, strokeWidth: 2 }}
                  d="M18.667 28L25.667 35L39.667 21"
                  initial={{ pathLength: 0, strokeWidth: 0 }}
                  stroke="#333333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="0"
                  transition={{
                    delay: 0.3
                  }}
                />
              </motion.svg>
            ) : (
              <Spinner
                mt={'94px'}
                size="xl"
              />
            )}
            <Text
              mb={'78px'}
              mt={5}
            >
              {status[data?.status_two as string]}
            </Text>
          </Center>
        </OrderChildMotion>
        <Box
          px={7.5}
          w={'full'}
        >
          <Box>
            <OrderChildMotion mb={'8'}>
              <Box
                fontSize={'xs'}
                lineHeight={4}
                mb={2.5}
              >
                FROM
              </Box>
              <Flex
                alignItems={'center'}
                justifyContent={'space-between'}
                w={'full'}
              >
                <Flex
                  alignItems={'center'}
                  gap={2.5}
                >
                  {data && (
                    <IconSvg
                      boxSize={'30'}
                      name={
                        Chains[chains[data?.from_chain] as ChainId]
                          ?.icon as IconName
                      }
                    />
                  )}
                  <VStack
                    alignItems={'flex-start'}
                    fontSize={'xs'}
                    gap={2}
                    lineHeight={4}
                  >
                    <Text>
                      -{data?.amount} {data?.coin}
                    </Text>
                    <Text>{data?.from_chain}</Text>
                  </VStack>
                </Flex>
                {data?.hash1 && (
                  <IconSvg
                    _hover={{
                      opacity: 0.9
                    }}
                    boxSize={6}
                    name="chainLink"
                    onClick={() =>
                      openLink(data?.from_chain as string, data?.hash1 as Hash)
                    }
                  />
                )}
              </Flex>
            </OrderChildMotion>

            <OrderChildMotion>
              <Box
                fontSize={'xs'}
                lineHeight={4}
                mb={2.5}
              >
                To
              </Box>
              <Flex
                alignItems={'center'}
                justifyContent={'space-between'}
                w={'full'}
              >
                <Flex
                  alignItems={'center'}
                  gap={2.5}
                >
                  {data && (
                    <IconSvg
                      boxSize={'30'}
                      name={
                        Chains[chains[data?.to_chain] as ChainId]
                          ?.icon as IconName
                      }
                    />
                  )}
                  <VStack
                    alignItems={'flex-start'}
                    fontSize={'xs'}
                    gap={2}
                    lineHeight={4}
                  >
                    <Text>
                      +{data?.amount} {data?.coin}
                    </Text>
                    <Text>{data?.to_chain}</Text>
                  </VStack>
                </Flex>
                {data?.hash2 && (
                  <IconSvg
                    _hover={{
                      opacity: 0.9
                    }}
                    boxSize={6}
                    name="chainLink"
                    onClick={() =>
                      openLink(data?.to_chain as string, data?.hash2 as Hash)
                    }
                  />
                )}
              </Flex>
            </OrderChildMotion>
          </Box>

          <OrderChildMotion
            mb={'10'}
            mt={'12'}
          >
            <Box
              color={'whiteAlpha.700'}
              fontSize={'xs'}
            >
              Payment Location
            </Box>
            <Flex
              alignItems={'center'}
              justifyContent={'space-between'}
              mt={4}
            >
              <Text
                fontSize={'xs'}
                lineHeight={'4'}
              >
                {data?.from_address}
              </Text>
              <Copy
                boxSize={'6'}
                text={data?.from_address as string}
              />
            </Flex>
          </OrderChildMotion>

          <OrderChildMotion mb={'7.5'}>
            <Box
              color={'whiteAlpha.700'}
              fontSize={'xs'}
            >
              Receive address
            </Box>
            <Flex
              alignItems={'center'}
              justifyContent={'space-between'}
              mt={4}
            >
              <Text
                fontSize={'xs'}
                lineHeight={'4'}
              >
                {data?.to_address}
              </Text>
              <Copy
                boxSize={'6'}
                text={data?.to_address as string}
              />
            </Flex>
          </OrderChildMotion>
        </Box>
      </ChakraMotionBox>
    );
  }
);

const History = ({ open }: { open: (id: number) => void }) => {
  const userInfo = useUserInfo();
  const { data, isLoading } = useSWR<{ list: HistoryProps[] }>(
    userInfo ? `${REQUEST_API.history}` : null,
    url => ajaxGet(url as axiosUrlType),
    {
      revalidateOnFocus: false
    }
  );

  const status = useMemo<{ [key: string]: string }>(() => {
    return {
      0: 'Processing',
      1: 'Execution',
      2: 'Success'
    };
  }, []);

  return (
    <Box height={'full'}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th px={0}>Amount</Th>
              <Th>Asset</Th>
              <Th isNumeric>Actions</Th>
              <Th isNumeric>STATUS</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.list?.map((item, index) => {
              return (
                <Tr
                  _hover={{ opacity: 0.9 }}
                  cursor={'pointer'}
                  key={index}
                  onClick={() => open(item.extract_id)}
                >
                  <Td px={0}>{item.amount}</Td>
                  <Td>{item.coin}</Td>
                  <Td isNumeric>{item.type === 1 ? 'Deposit' : 'Withdraw'}</Td>
                  <Td isNumeric>{status[item.status_two]}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <LoadDataContainer
        isLoading={isLoading}
        isNoData={!data?.list?.length}
      >
        <></>
      </LoadDataContainer>
    </Box>
  );
};

const AnimateBox = ({
  children,
  keyStr,
  scale,
  delay,
  ...boxProps
}: PropsWithChildren & {
  keyStr: string;
  scale?: number;
  delay?: number;
} & BoxProps) => {
  const textVariants = {
    enter: { y: 20, opacity: 0, scale: scale || 1 },
    center: { y: 0, opacity: 1, scale: 1 },
    exit: { y: -20, opacity: 0, scale: scale || 1 }
  };

  return (
    <AnimatePresence mode="popLayout">
      <ChakraMotionBox
        animate="center"
        exit="exit"
        initial="enter"
        key={keyStr}
        lineHeight={'100%'}
        transition={{ duration: '0.5', type: 'tween', delay: `${delay || 0}` }}
        variants={textVariants}
        w={'full'}
        {...boxProps}
      >
        {children}
      </ChakraMotionBox>
    </AnimatePresence>
  );
};

const DepositWithdraw = () => {
  const [flag, setFlag] = useBoolean();
  const [isLoading, setIsLoading] = useBoolean(false);
  const [currentChainInfo, setCurrentChainInfo] = useState<null | ChainInfo>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenQrcode,
    onOpen: onOpenQrcode,
    onClose: onCloseQrCode
  } = useDisclosure();
  const {
    tokenList,
    withdrawAddress,
    setWithDrawAddress,
    val,
    flag: txLoading,
    deposit,
    withdraw,
    btnInfo,
    handleMax,
    onChange,
    symbol,
    chain,
    balance,
    changeSymbol,
    changeChain,
    birdegType,
    DepositSTTDOGEAddress,
    config
  } = useDepositWithdow();
  const { switchChainAsync } = useSwitchChain();
  const chainId = useChainId();
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const handOpenChain = useCallback(() => {
    setFlag.off();
    onOpen();
  }, [onOpen, setFlag]);

  const handOpenToken = useCallback(() => {
    setFlag.on();
    onOpen();
  }, [onOpen, setFlag]);

  const handleItem = useCallback(
    async (item: ChainInfo | TokenInfo) => {
      if (!address) return openConnectModal?.();
      if (flag) {
        changeSymbol(item as TokenInfo);
      } else {
        if (isLoading) return;

        if (
          !birdegType &&
          !otherChains.includes(item.id) &&
          chainId !== item.id
        ) {
          setCurrentChainInfo(item);
          setIsLoading.on();
          await switchChainAsync(
            { chainId: item.id as number },
            {
              onSettled() {
                setIsLoading.off();
                setCurrentChainInfo(null);
              }
            }
          );
        }
        changeChain(item.id);
      }
      onClose();
    },
    [
      changeSymbol,
      birdegType,
      onClose,
      openConnectModal,
      address,
      isLoading,
      setCurrentChainInfo,
      setIsLoading,
      switchChainAsync,
      changeChain,
      chainId,
      flag
    ]
  );

  const handleBtn = useCallback(() => {
    if (!birdegType) {
      if (otherChains.includes(chain)) {
        onOpenQrcode();
      } else {
        deposit();
      }
    } else {
      withdraw();
    }
  }, [onOpenQrcode, withdraw, deposit, birdegType, chain]);

  const isMounted = useIsMounted();

  const variants = {
    close: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1 }
  };
  // const { watchAssetAsync } = useWatchAsset();
  const walletClient = useWalletClient();

  const handleAddToken = useCallback(
    async (symbol: TokenInfo) => {
      await walletClient?.data?.watchAsset({
        type: 'ERC20',
        options: {
          address: symbol.NECAddres as string,
          symbol: symbol.symbolName,
          decimals: 18
        }
      });
    },
    [walletClient]
  );

  return (
    <Flex
      flexDir={'column'}
      h={'full'}
      justify={'space-between'}
    >
      <NECModal
        autoFocus={false}
        closeOnOverlayClick={false}
        header={() => `Choose ${flag ? 'Token' : 'Network'}`}
        isOpen={isOpen}
        onClose={onClose}
        showClose
        size={'sm'}
      >
        <Box>
          <Flex
            flexDir={'column'}
            gap={10}
          >
            {(flag ? tokenList : swapChainList).map(item => {
              return (
                <Button
                  colorScheme="purple"
                  h={'44px'}
                  iconSpacing={'3'}
                  justifyContent={'flex-start'}
                  key={item.name}
                  leftIcon={
                    <IconSvg
                      boxSize={'5'}
                      name={item.icon}
                    />
                  }
                  onClick={() => handleItem(item)}
                  px={3}
                  rightIcon={
                    isLoading && currentChainInfo?.id === item.id ? (
                      <Spinner boxSize={4} />
                    ) : (
                      <></>
                    )
                  }
                  size={'md'}
                  variant={'outLine'}
                  w={'202px'}
                  width={'full'}
                >
                  {item.name}
                </Button>
              );
            })}
          </Flex>
        </Box>
      </NECModal>

      <NECModal
        autoFocus={false}
        closeOnOverlayClick={false}
        header={() => 'Cross-Chain Deposit'}
        isOpen={isOpenQrcode}
        onClose={onCloseQrCode}
        showClose
        size={'sm'}
      >
        <Box>
          <Box
            color={'whiteAlpha.700'}
            fontSize={'sm'}
            mb={'9'}
          >
            Use your wallet to scan the QR code or copy the deposit address and
            paste it into your wallet to complete the deposit operation
          </Box>
          <Box mb={'9'}>
            <Box fontSize={'sm'}>Deposit Address</Box>
            <Flex
              alignItems={'center'}
              justifyContent={'space-between'}
              mt={4}
            >
              <Text
                color={'whiteAlpha.700'}
                fontSize={'xs'}
                lineHeight={'4'}
              >
                {DepositSTTDOGEAddress}
              </Text>
              <Copy text={DepositSTTDOGEAddress || ''} />
            </Flex>
          </Box>

          <Box
            bg={'white'}
            h={'130px'}
            m={'0 auto'}
            mb={7.5}
            p={1}
            w={'130px'}
          >
            <QRCode
              size={122}
              value={DepositSTTDOGEAddress || ''}
            />
          </Box>
          <Button
            onClick={onCloseQrCode}
            size={'lg'}
            variant={'solid'}
            w={'full'}
          >
            Deposited
          </Button>
        </Box>
      </NECModal>
      <Box>
        <Flex
          fontSize={'xs'}
          gap={3}
          w={'full'}
        >
          <Box flex={1}>FROM</Box>
          <Box flex={1}>TO</Box>
        </Flex>

        <Flex
          flexFlow={birdegType === 0 ? 'row' : 'row-reverse'}
          gap={3}
          mt={6}
        >
          <Button
            colorScheme="purple"
            h={'78px'}
            iconSpacing={'3'}
            leftIcon={
              <AnimateBox
                keyStr={Chains[chain].name}
                scale={0.7}
              >
                <IconSvg
                  boxSize={'30'}
                  name={Chains[chain].icon}
                />
              </AnimateBox>
            }
            onClick={handOpenChain}
            px={3}
            rightIcon={
              <IconSvg
                boxSize={'4'}
                name="down"
              />
            }
            size={'md'}
            variant={'outLine'}
            w={'202px'}
          >
            <AnimateBox
              delay={0.2}
              keyStr={Chains[chain].name}
            >
              {Chains[chain].name}
            </AnimateBox>
          </Button>

          <Button
            colorScheme="purple"
            h={'78px'}
            iconSpacing={'3'}
            justifyContent={'flex-start'}
            leftIcon={
              <IconSvg
                boxSize={'30'}
                name={currentChain.icon}
              />
            }
            size={'md'}
            variant={'outLine'}
            w={'202px'}
          >
            <AnimateBox keyStr={currentChain.name}>
              {currentChain.name}
            </AnimateBox>
          </Button>
        </Flex>
        {(!birdegType && !otherChains.includes(chain)) || birdegType ? (
          <>
            <Flex
              alignItems={'center'}
              border={'1px'}
              borderColor={'white'}
              borderRadius={'lg'}
              h={'78px'}
              mt={7.5}
              p={3}
            >
              <Input
                _focusVisible={{
                  border: 'none'
                }}
                autoFocus
                border={'none'}
                onChange={onChange}
                placeholder="0.00"
                value={val}
                w={'180px'}
              />
              <Box
                bg={'white'}
                h={'full'}
                opacity={0.5}
                w={'0.75px'}
              ></Box>
              <Flex
                alignItems={'center'}
                flex={1}
                ml={'9'}
                pos={'relative'}
              >
                <Skeleton
                  isLoaded={isMounted}
                  mr={2}
                  w={'full'}
                >
                  <Center
                    h={'100%'}
                    w={'100%'}
                  >
                    <AnimateBox
                      keyStr={symbol.symbol}
                      w={'auto'}
                    >
                      {birdegType ? (
                        <Tooltip
                          aria-label={`Add ${symbol.name} to your wallet`}
                          closeOnClick={false}
                          closeOnMouseDown={false}
                          label={`Add ${symbol.name} to your wallet`}
                          placement="top"
                        >
                          <IconSvg
                            boxSize={'30'}
                            name={symbol.icon}
                            onClick={() => handleAddToken(symbol)}
                          />
                        </Tooltip>
                      ) : (
                        <IconSvg
                          boxSize={'30'}
                          name={symbol.icon}
                        />
                      )}
                    </AnimateBox>
                    <AnimateBox
                      delay={0.2}
                      keyStr={symbol.symbol}
                    >
                      <Box
                        cursor={'pointer'}
                        flex={'1'}
                        fontFamily={'day'}
                        ml={'5'}
                        onClick={handOpenToken}
                        textAlign={'left'}
                      >
                        {symbol.symbol}
                      </Box>
                    </AnimateBox>
                  </Center>
                </Skeleton>
                <IconSvg
                  boxSize={'4'}
                  cursor={'pointer'}
                  name="down"
                  onClick={handOpenToken}
                />
              </Flex>
            </Flex>

            <Flex
              justifyContent={'space-between'}
              mt={5}
            >
              <Text>Balance {balance.text}</Text>
              <Box
                _hover={{
                  opacity: 0.9
                }}
                color={'white'}
                cursor={'pointer'}
                onClick={handleMax}
              >
                MAX
              </Box>
            </Flex>
          </>
        ) : (
          <></>
        )}

        <AnimatePresence mode="popLayout">
          <ChakraMotionBox
            animate={address ? 'open' : 'close'}
            initial="close"
          >
            {
              <ChakraMotionBox
                layout
                transition={{
                  type: 'tween'
                }}
                variants={variants}
              >
                <Box mt={7.5}>
                  <Box
                    color={'whiteAlpha.700'}
                    fontSize={'xs'}
                  >
                    Recipient Address
                  </Box>
                  <Flex
                    alignItems={'center'}
                    border={'1px'}
                    borderColor={'white'}
                    borderRadius={'lg'}
                    fontSize={'xs'}
                    h={'48px'}
                    mt={2.5}
                    p={3}
                  >
                    {otherChains.includes(chain) && birdegType ? (
                      <Input
                        _focusVisible={{
                          border: 'none'
                        }}
                        autoFocus
                        border={'none'}
                        onChange={e => setWithDrawAddress(e.target.value)}
                        placeholder="Enter ecipient address"
                        value={withdrawAddress}
                        w={'180px'}
                        width={'full'}
                      />
                    ) : (
                      address
                    )}
                  </Flex>
                </Box>
              </ChakraMotionBox>
            }
          </ChakraMotionBox>
        </AnimatePresence>
      </Box>
      <CButton
        isDisabled={btnInfo.status}
        isLoading={txLoading}
        mt={'32px'}
        onClick={handleBtn}
        size={'lg'}
        variant={'solid'}
        w={'full'}
      >
        {btnInfo.text}
      </CButton>

      {birdegType ? (
        <Text
          fontSize={'11px'}
          mt={5}
        >
          Deducting service + gas fee (
          {
            config?.[
              `${symbol.symbol.toLocaleLowerCase()}_fee` as keyof ConfigProps
            ]
          }{' '}
          {symbol.symbol}+gas),the amount subject to actual receipt
        </Text>
      ) : (
        <></>
      )}
    </Flex>
  );
};

const Bridge = () => {
  const [flag, setFlag] = useBoolean();
  const [selectIndex, setSelectIndex] = useState(0);
  const [id, setId] = useState(0);
  const userInfo = useUserInfo();

  const { changeBirdegType } = useBirdgeContext();

  const tabs = useMemo(() => {
    return ['DEPOSIT', 'WITHDRAW', 'HISTORY'];
  }, []);

  const handleTab = useCallback(
    (index: number) => {
      setSelectIndex(index);
      index !== 2 && changeBirdegType(index);
    },
    [setSelectIndex, changeBirdegType]
  );

  const updateWalletInfo = useUpdateWalletInfo();

  const { data } = useSWR<WalletInfo>(
    userInfo ? REQUEST_API.wallet : null,
    url => ajaxGet(url as axiosUrlType),
    {
      revalidateOnFocus: false
    }
  );

  useEffect(() => {
    data && updateWalletInfo(data);
  }, [data, updateWalletInfo]);

  const handleOpen = useCallback(
    (id: number) => {
      setFlag.on();
      setId(id);
    },
    [setFlag, setId]
  );

  return (
    <ContentContainer>
      <Box
        pos={'relative'}
        pt={'80px'}
      >
        {/* <Box
          bg="linear-gradient(135deg, rgba(23, 106, 177, 0.2) 0%, rgba(203, 216, 241, 0.20) 100%)"
          borderRadius={'full'}
          filter={'blur(75px)'}
          height={'698px'}
          left={'208px'}
          mixBlendMode={'screen'}
          pos={'absolute'}
          top={'4px'}
          w={'698px'}
          zIndex={'hide'}
        ></Box>
        <Box
          bg=" linear-gradient(135deg, rgba(101, 98, 251, 0.46) 0%, rgba(62, 44, 112, 0.26) 50%, rgba(32, 22, 68, 0.60) 100%)"
          borderRadius={'full'}
          filter={'blur(75px)'}
          height={'698px'}
          left={'254px'}
          pos={'absolute'}
          top={'4px'}
          w={'698px'}
          zIndex={'hide'}
        ></Box> */}
        <HStack
          alignItems={'flex-start'}
          justifyContent={'space-between'}
        >
          <Box>
            <Text
              fontFamily={'day'}
              fontSize={'3.5xl'}
              mb={8}
            >
              Bridge to Earn Rewards
            </Text>
            <Text
              fontSize={'xl'}
              lineHeight={'1.5'}
            >
              Neura Points Pegged to the $BCC
              <br /> Earn more points over time based on the amount you bridge.
            </Text>
          </Box>
          <Flex
            backdropFilter={'8px'}
            bg={'rgba(5, 5, 5, 0.90)'}
            border={'1px solid'}
            borderColor={'whiteAlpha.100'}
            borderRadius={'4xl'}
            boxShadow={
              '0px 37.5px 75px 0px rgba(255, 255, 255, 0.15) inset, 0px 3.75px 7.5px 0px rgba(0, 0, 0, 0.05), 0px 11.25px 22.5px 0px rgba(0, 0, 0, 0.05), 0px 22.5px 45px 0px rgba(0, 0, 0, 0.10)'
            }
            flexDir={'column'}
            h={selectIndex === 1 ? '698px' : '658px'}
            mixBlendMode={'screen'}
            overflow={'hidden'}
            pb={5}
            position={'relative'}
            w={'518px'}
          >
            <AnimatePresence mode="popLayout">
              {
                <OrderInfo
                  close={setFlag.off}
                  flag={flag}
                  id={id}
                />
              }
            </AnimatePresence>
            <Flex>
              {tabs.map((item, index) => {
                return (
                  <Center
                    bg={selectIndex === index ? '' : ''}
                    color={selectIndex === index ? 'black' : 'white'}
                    cursor={'pointer'}
                    flex={1}
                    h={'48px'}
                    key={index}
                    onClick={() => handleTab(index)}
                    pos={'relative'}
                    transitionDuration={'normal'}
                  >
                    {item}
                    {selectIndex === index && (
                      <ChakraMotionBox
                        bg="white"
                        bottom="0"
                        layoutId="underline"
                        left="0"
                        pos={'absolute'}
                        right="0"
                        top="0"
                        // @ts-ignore
                        transition={{ type: 'spring', duration: 0.5 }}
                        w={'100%'}
                        zIndex={'hide'}
                      />
                    )}
                  </Center>
                );
              })}
            </Flex>
            <BirdegHeader />
            <BgCard
              flex={1}
              mx={'5'}
            >
              {selectIndex === 2 ? (
                <History open={handleOpen} />
              ) : (
                <DepositWithdraw />
              )}
              {/* 90px  175px */}
            </BgCard>
          </Flex>
        </HStack>
      </Box>
    </ContentContainer>
  );
};

const Page = () => (
  <BridgeProvider>
    <Bridge />
  </BridgeProvider>
);

export default Page;
