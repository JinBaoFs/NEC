import { Flex, Image } from '@chakra-ui/react';
import IconSvg, { IconName } from '../IconSvg';

const Tag = ({ text, icon }: { text: string; icon?: IconName }) => {
  return (
    <Flex
      alignItems={'center'}
      backgroundPosition={'bottom'}
      bgRepeat={'no-repeat'}
      cursor={'pointer'}
      h={'32px'}
      pos={'relative'}
      px={5}
      w={'271px'}
    >
      <Image
        alt=""
        bottom={1}
        left={0}
        pos={'absolute'}
        src={'/assets/img/tag-bg.png'}
        w={'271px'}
      />
      {icon && (
        <IconSvg
          boxSize={6}
          mr={2.5}
          name={icon}
        />
      )}
      {text}
    </Flex>
  );
};

export default Tag;
