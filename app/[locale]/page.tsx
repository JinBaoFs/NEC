'use client';

import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  // Image,
  useMediaQuery
} from '@chakra-ui/react';
// import { Image } from '@chakra-ui/next-js';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ContentContainer from '@/components/ContentContainer';
import { Link } from '@/i18n/navigation';
import ChakraMotionBox from '@/components/ChakraMotionBox';

const StaggeredFadeIn = ({ text }: { text: string }) => {
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { type: 'tween', delay: i * 0.1 }
    })
  };
  const words = text.split(' ');
  return (
    <ChakraMotionBox
      animate="visible"
      display={'flex'}
      initial="hidden"
    >
      {words.map((word, index) => {
        return (
          <ChakraMotionBox
            custom={index}
            key={index}
            variants={wordVariants}
          >
            {word}&nbsp;
          </ChakraMotionBox>
        );
      })}
    </ChakraMotionBox>
  );
};

export default function Home() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const inviteCode = searchParams.get('inviteCode');
    localStorage.setItem('inviteCode', inviteCode as string);
  }, [searchParams]);

  const [isLargerThan1500] = useMediaQuery('(min-width: 1500px)');

  return (
    <Box>
      <Image
        alt=""
        bgRepeat={'no-repeat'}
        objectFit={'cover'}
        pos={'fixed'}
        right={0}
        src={'/assets/img/index_bg1.png'}
        top={'-153px'}
        w={'130%'}
        zIndex={'hide'}
      />

      <ContentContainer>
        {/* <Image
        alt=""
        h={'650px'}
        minW={'650px'}
        pos={'fixed'}
        right={'302'}
        src={'/assets/img/index_bg0.png'}
        top={'206px'}
        zIndex={'hide'}
      /> */}

        <Flex
          alignItems={'center'}
          flexDir={'column'}
          my={isLargerThan1500 ? '140px' : '50px'}
        >
          <Heading
            fontFamily={'day'}
            fontSize={'5xl'}
            lineHeight={'normal'}
            mb={'50px'}
          >
            <StaggeredFadeIn text="Verifiable Agents for Any Task" />
          </Heading>

          <Heading
            fontFamily={'day'}
            fontSize={'5xl'}
            lineHeight={'normal'}
            maxW={'1300px'}
            mb={'150px'}
          >
            Create smart web3 systems by just stating your intent. Boundary
            powers agenticmarkets that find optimal solutions with zero
            counterparty risk.
            {/* <StaggeredFadeIn text="Create smart web3 systems by just stating your intent. Boundary powers agenticmarkets that find optimal solutions with zero counterparty risk." /> */}
          </Heading>
          <Flex gap="10">
            <Link href={'/bridge'}>
              <Button
                size={'lg'}
                variant={'solid'}
                w={'210px'}
              >
                Bridge Assets
              </Button>
            </Link>
            <Link href={'/invitation'}>
              <Button
                colorScheme="white"
                size={'lg'}
                variant={'outline'}
                w={'210px'}
              >
                Invitation
              </Button>
            </Link>
          </Flex>
        </Flex>
      </ContentContainer>
    </Box>
  );
}
