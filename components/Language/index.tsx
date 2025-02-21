import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Center,
  VStack,
  Text,
  useMediaQuery
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useChangeLng } from '@/i18n/navigation';
import IconSvg from '../IconSvg';

const Language = () => {
  const path = usePathname();
  const { changeLng } = useChangeLng();

  const langConfig = useMemo(() => {
    return [
      {
        name: '$USD/English',
        path: 'en'
      },
      {
        name: '¥CNY/简体中文',
        path: 'zh'
      }
    ];
  }, []);

  const currentLang = useMemo(() => {
    const arr = path.slice(1).split('/');
    const data = langConfig.find(item => item.path === arr[0]);
    return data || langConfig[0];
  }, [langConfig, path]);

  const [isLargerThan887] = useMediaQuery('( min-width: 887px )');

  return (
    <Popover
      autoFocus={true}
      placement={isLargerThan887 ? 'bottom' : 'right'}
    >
      <PopoverTrigger>
        <Center
          bg={'gray.900'}
          border={'1px solid'}
          borderColor={'black.500'}
          borderRadius={'lg'}
          cursor={'pointer'}
          fontSize={'sm'}
          gap={2}
          h={'40px'}
          mb={{ base: '2', md: '0' }}
          w={{ md: '153px' }}
        >
          <Text>{currentLang.name}</Text>
          <IconSvg
            boxSize={'4'}
            name="right"
            transform={{ md: 'rotate(90deg)' }}
          />
        </Center>
      </PopoverTrigger>
      <PopoverContent
        _focusVisible={{
          boxShadow: 'none',
          outline: 'none'
        }}
        bg={'gray.900'}
        border={'1px solid'}
        borderColor={'black.400'}
        boxShadow={'none'}
        w={'153px'}
      >
        <PopoverBody>
          <VStack gap={1}>
            {langConfig.map((item, index) => {
              return (
                <Center
                  _hover={{
                    bg: 'black.300'
                  }}
                  bg={item.path === currentLang.path ? 'black.300' : ''}
                  borderRadius={'lg'}
                  cursor={'pointer'}
                  fontSize={'sm'}
                  key={index}
                  lineHeight={'24px'}
                  onClick={() => changeLng(item.path)}
                  py={2}
                  transitionDuration={'normal'}
                  w={'full'}
                >
                  {item.name}
                </Center>
              );
            })}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Language;
