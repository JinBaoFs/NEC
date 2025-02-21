'use client';

import {
  Box,
  BoxProps,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text
} from '@chakra-ui/react';
import { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import ContentContainer from '@/components/ContentContainer';
import IconSvg from '@/components/IconSvg';
import { DISCORD_URL, DOCS_URL } from '@/constants';
import FilterCard, { ContentFilterCard } from '@/components/FilterCard';
import useLenis from '@/hooks/useLenis';

const Distribution = () => {
  const list = useMemo(
    () => [
      {
        img: 'distribution2.png?1',
        name: 'JOIN THE COMMUNITY',
        // eslint-disable-next-line quotes
        desc: "In the meantime, join our developer community on Discord to learn more about Boundary (so you don't miss the airdrop)."
      }
    ],
    []
  );

  return (
    <Flex
      flexDir={'column'}
      gap={'44px'}
      mt={200}
      pos={'relative'}
    >
      {/* <Box
        bg="linear-gradient(135deg, rgba(23, 106, 177, 0.2) 0%, rgba(203, 216, 241, 0.20) 100%)"
        borderRadius={'full'}
        filter={'blur(75px)'}
        height={'790px'}
        left={'175px'}
        mixBlendMode={'screen'}
        pos={'absolute'}
        top={'-188px'}
        w={'790px'}
        zIndex={'hide'}
      ></Box>
      <Box
        bg=" linear-gradient(135deg, rgba(101, 98, 251, 0.46) 0%, rgba(62, 44, 112, 0.26) 50%, rgba(32, 22, 68, 0.60) 100%)"
        borderRadius={'full'}
        filter={'blur(75px)'}
        height={'698px'}
        left={'175px'}
        pos={'absolute'}
        top={'-188px'}
        w={'698px'}
        zIndex={'hide'}
      ></Box> */}
      {list.map((item, index) => {
        return (
          <Flex
            gap={16}
            key={index}
          >
            <Center
              h={'282px'}
              minW={'280px'}
            >
              <Image
                alt=""
                h={'full'}
                src={`/assets/img/${item.img}`}
                w={'auto'}
              />
            </Center>
            <Flex
              flexDir={'column'}
              gap={5}
              lineHeight={'normal'}
            >
              <Heading
                color={'whiteAlpha.700'}
                fontSize={'lg'}
                mt={'88px'}
              >
                {item.name}
              </Heading>
              <Text
                fontSize={'lg'}
                w={'800px'}
              >
                {item.desc}
              </Text>
              {index === 0 && (
                <Link
                  href={DISCORD_URL}
                  target="_blank"
                >
                  <Button
                    bg={'white'}
                    color={'black'}
                    iconSpacing={'4'}
                    mt={'10px'}
                    rightIcon={
                      <IconSvg
                        boxSize={'4'}
                        name="right"
                      />
                    }
                    size={'md'}
                    variant={'outLine'}
                    w={'214px'}
                  >
                    Join Boundary Discord
                  </Button>
                </Link>
              )}
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

const GridCard = () => {
  const BoxStyle: BoxProps = {
    border: '1px solid',
    borderColor: 'whiteAlpha.100',
    borderRadius: '3xl',
    pos: 'relative',
    bg: 'radial-gradient(90.63% 73.44% at 50% 0%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.00) 100%)'
  };

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: ref,
    offset: ['start end', 'end end']
  });

  const x = useTransform(scrollYProgress1, [0, 1], [-200, 0]);
  const x1 = useTransform(scrollYProgress1, [0, 1], [200, 0]);

  return (
    <Grid
      gridGap={5}
      h={'950px'}
      ref={ref}
      templateColumns={'repeat(10, 1fr)'}
      templateRows={'repeat(2, 1fr)'}
    >
      <GridItem
        {...BoxStyle}
        as={motion.div}
        colEnd={7}
        colStart={1}
        display={'flex'}
        justifyContent={'center'}
        rowSpan={1}
        style={
          {
            y,
            x
          } as any
        }
      >
        <Image
          alt=""
          h={'220px'}
          left={'50%'}
          pos={'absolute'}
          src="/assets/img/grid0.png?1"
          top={'58px'}
          transform={'translateX(-50%)'}
          w={'220px'}
        />

        <ContentFilterCard
          desc="The DPOW consensus is achieved through a small set of pre-approved validators, typically trusted entities that are incentivized to maintain the network's security and efficiency. Unlike PoW blockchains, a DPOW chain is able to maintain extremely low transaction fees, often much lower than even Solana."
          mt={'198px'}
          title="Ultra-low gas fees"
          w={'400px'}
        ></ContentFilterCard>
      </GridItem>
      <GridItem
        {...BoxStyle}
        as={motion.div}
        colEnd={11}
        colStart={7}
        display={'flex'}
        justifyContent={'center'}
        rowSpan={1}
        style={
          {
            y,
            x: x1
          } as any
        }
      >
        <Image
          alt=""
          h={'178px'}
          left={'50%'}
          pos={'absolute'}
          src="/assets/img/grid1.png?1"
          top={'74px'}
          transform={'translateX(-50%)'}
          w={'220px'}
        />
        <ContentFilterCard
          desc="Smart contracts on the Boundary blockchain utilize AI-powered components for advanced functionality, as machine learning models are employed to automate complex business logic, perform risk analysis, and provide intelligent recommendations."
          mt={'198px'}
          title="Smart contracts"
          w={'360px'}
        ></ContentFilterCard>
      </GridItem>
      <GridItem
        {...BoxStyle}
        as={motion.div}
        colEnd={5}
        colStart={1}
        display={'flex'}
        justifyContent={'center'}
        rowSpan={1}
        rowStart={2}
        style={
          {
            y,
            x
          } as any
        }
      >
        <Image
          alt=""
          h={'216px'}
          left={'168px'}
          pos={'absolute'}
          src="/assets/img/grid2.png?1"
          top={'104px'}
          w={'216px'}
        />
        <ContentFilterCard
          desc="On-chain AI inferences are enabled for all developing dApps within the network, as it allows its oracle monitors the network, analyzes data, and makes adjustments to parameters like block time, gas limits, and reward schedules based on real-time conditions."
          mt={'168px'}
          title="AI integration"
          w={'360px'}
        ></ContentFilterCard>
      </GridItem>
      <GridItem
        {...BoxStyle}
        as={motion.div}
        colEnd={11}
        colStart={5}
        display={'flex'}
        justifyContent={'center'}
        rowSpan={1}
        rowStart={2}
        style={
          {
            y,
            x: x1
          } as any
        }
      >
        <Image
          alt=""
          h={'162px'}
          left={'260px'}
          pos={'absolute'}
          src="/assets/img/grid3.png?1"
          top={'90px'}
          w={'198px'}
        />
        <FilterCard
          h={'192px'}
          left={'245px'}
          pos={'absolute'}
          top={'171px'}
          w={'295px'}
        >
          <></>
        </FilterCard>
        <ContentFilterCard
          desc="The Boundary security system continuously monitors on-chain activities for anomalies and threats, using behavioral analysis techniques and anomaly detection to identify and mitigate attacks or malicious activity."
          mt={'201px'}
          title="Blockchain Security"
          w={'305px'}
        ></ContentFilterCard>
      </GridItem>
    </Grid>
  );
};

const Partners = () => {
  return (
    <Center flexDir={'column'}>
      <Heading
        // backgroundImage={'linear-gradient(225deg, #EDBAFF  30%, #A1FFFF 100%)'}
        // bgClip={'text'}
        fontFamily={'day'}
        fontSize={'xl'}
        lineHeight={'normal'}
      >
        Infrastructure Partners
      </Heading>
      <Image
        alt=""
        h={'148px'}
        mb={573}
        minW={'820px'}
        mt={'100'}
        src="/assets/img/partners.png"
      />
    </Center>
  );
};

const Boundary = () => {
  useLenis();
  return (
    <Box pos={'relative'}>
      <Box
        mt={'175px'}
        pos={'relative'}
      >
        <Image
          alt=""
          height={'1080px'}
          pos={'absolute'}
          src="/assets/img/base-bg.png?"
          top={'-160px'}
          w={'full'}
          zIndex={'hide'}
        />
        <ContentContainer h={'auto'}>
          <Flex
            justifyContent={'space-between'}
            mb={'103px'}
            pos={'relative'}
            pt={'38px'}
          >
            <Box>
              {/* <Box
              bg="linear-gradient(135deg, rgba(23, 106, 177, 0.20) 0%, rgba(203, 216, 241, 0.20) 100%)"
              borderRadius={'full'}
              filter={'blur(75px)'}
              height={'858px'}
              left={'155px'}
              mixBlendMode={'screen'}
              pos={'absolute'}
              top={'-274px'}
              w={'858px'}
              zIndex={'hide'}
            ></Box>
            <Box
              bg=" linear-gradient(135deg, rgba(101, 98, 251, 0.46) 0%, rgba(62, 44, 112, 0.26) 50%, rgba(32, 22, 68, 0.60) 100%)"
              borderRadius={'full'}
              filter={'blur(75px)'}
              height={'756px'}
              left={'205px'}
              pos={'absolute'}
              top={'-259px'}
              w={'756px'}
              zIndex={'hide'}
            ></Box> */}
              <Heading
                fontFamily={'day'}
                fontSize={'3.5xl'}
                lineHeight={'normal'}
              >
                Why
              </Heading>
              <Heading
                // backgroundImage={
                //   'linear-gradient(225deg, #EDBAFF  63.12%, #A1FFFF 92.45%)'
                // }
                // bgClip={'text'}
                fontFamily={'day'}
                fontSize={'3.5xl'}
                lineHeight={'normal'}
                mb={'60px'}
              >
                Boundary?
              </Heading>

              <Text
                fontSize={'lg'}
                lineHeight={7}
                mb={'10'}
                // eslint-disable-next-line react/no-unescaped-entities
                w={'580px'}
              >
                Welcome to the Boundary development community. The Boundary
                network is an AI-driven repository for data and information.
                It's a permanent and decentralized web stored inside an open,
                DPOW-based ledger.
              </Text>
              <Text
                fontSize={'lg'}
                lineHeight={7}
                mb={'10'}
                w={'580px'}
              >
                Built on a stable and mature DPOW foundation, Boundary is
                ensured with security and efficiency. It leverages AI in various
                ways to enhance its capacity and functionality. Let's build a
                new decentralized Boundary!
              </Text>
              <Link
                href={DOCS_URL}
                target="_blank"
              >
                <Button
                  bg={'white'}
                  color={'black'}
                  iconSpacing={'4'}
                  rightIcon={
                    <IconSvg
                      boxSize={'4'}
                      name="right"
                    />
                  }
                  size={'md'}
                  variant={'outLine'}
                  w={'214px'}
                >
                  VIEW DOCS
                </Button>
              </Link>
            </Box>
            <Image
              alt=""
              h={'570px'}
              src="/assets/img/why-bg0.png"
              w={'515px'}
            />
          </Flex>

          <Box
            fontSize={'3.5xl'}
            fontWeight={'400'}
            letterSpacing={'-1.2px'}
            lineHeight={'normal'}
            mb={'60px'}
            w={'1009px'}
          >
            <Box mb={'10'}>
              Boundary
              <Box
                as="span"
                color={'whiteAlpha.700'}
              >
                {' '}
                adopts a Proof of Authority (DPOW) consensus mechanism.
              </Box>
            </Box>
            <Text color={'whiteAlpha.700'}>
              Authorities with proven track records and reputations are
              accountable for the integrity of the network, providing faster
              transaction confirmation times and lower energy consumption
              compared to PoW.
            </Text>
          </Box>
          <GridCard />
          <Divider
            colorScheme={'whiteAlpha'}
            my={'16'}
            opacity={'0.1'}
          />
          <Distribution />
          <Divider
            colorScheme={'whiteAlpha'}
            my={'100'}
            opacity={'0.1'}
          />
          <Partners />
        </ContentContainer>
        <Image
          alt=""
          bottom={'0'}
          height={'631px'}
          pos={'absolute'}
          src="/assets/img/why-footer.png?1"
          w={'full'}
          zIndex={'hide'}
        />
      </Box>
    </Box>
  );
};

export default Boundary;
