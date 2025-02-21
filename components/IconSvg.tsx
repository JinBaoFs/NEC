import type { HTMLChakraProps } from '@chakra-ui/react';
import { Skeleton, Image, chakra } from '@chakra-ui/react';
import React from 'react';
import { type IconName } from 'public/icons/name';
import { ChainId, otherChains } from '@/constants';

export const href = '/icons/sprite.svg?1.0.2';

export { IconName };

interface Props extends HTMLChakraProps<'div'> {
  name: IconName | 'STT' | 'DOGE';
  isLoading?: boolean;
}

const IconSvg = (
  { name, isLoading, ...props }: Props,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  return (
    <Skeleton
      display="inline-block"
      isLoaded={!isLoading}
      {...props}
      ref={ref}
      transitionDuration={'normal'}
    >
      {otherChains.includes(name as ChainId) ? (
        <Image
          alt=""
          src={`/assets/img/${name}.png`}
        />
      ) : (
        <chakra.svg
          cursor={'pointer'}
          h="100%"
          w="100%"
        >
          <use href={`${href}#${name}`} />
        </chakra.svg>
      )}
    </Skeleton>
  );
};

export default React.forwardRef(IconSvg);
