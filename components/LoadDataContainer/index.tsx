import { Center, Spinner, BoxProps, Box } from '@chakra-ui/react';
import Image from 'next/image';
import { useAccount } from 'wagmi';

const LoadDataContainer = ({
  isNoData,
  src,
  tip,
  children,
  isLoading,
  noNeedConnectWallet = false,
  ...boxProps
}: {
  isNoData?: boolean;
  noNeedConnectWallet?: boolean;
  isLoading?: boolean;
  src?: string;
  tip?: string;
  children: React.ReactNode;
} & BoxProps) => {
  const account = useAccount();

  if (noNeedConnectWallet && !isNoData) return <>{children}</>;

  return (
    <>
      {isLoading || isNoData || !account.address ? (
        <Center
          alignContent={'center'}
          flexDir={'column'}
          gap={4}
          h="100%"
          justifyContent={'center'}
          {...boxProps}
        >
          {!account.address && !noNeedConnectWallet ? (
            <>
              <Image
                alt="No Data"
                height={150}
                src={'/assets/img/connect.png?2'}
                width={160}
              />
              <Box
                color={'white'}
                fontSize={'xs'}
              >
                Connect Wallet First
              </Box>
            </>
          ) : (
            <>
              {isLoading ? (
                <Spinner size={'xl'} />
              ) : isNoData ? (
                <>
                  <Image
                    alt="No Data"
                    height={200}
                    src={src || '/assets/img/nodata.png?1'}
                    width={200}
                  />
                  <Box
                    color={'white'}
                    fontSize={'xs'}
                    textAlign={'center'}
                  >
                    {tip || 'No Data'}
                  </Box>
                </>
              ) : (
                <div></div>
              )}
            </>
          )}
        </Center>
      ) : (
        children
      )}
    </>
  );
};
export default LoadDataContainer;
