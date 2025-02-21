import { BoxProps, Tooltip, useBoolean, useClipboard } from '@chakra-ui/react';
import { useCallback } from 'react';
import IconSvg from '../IconSvg';

export const Copy = ({ text, ...boxProps }: { text: string } & BoxProps) => {
  const [status, setStatus] = useBoolean();
  const { onCopy } = useClipboard(text);

  const handleCopy = useCallback(() => {
    setStatus.on();
    onCopy();
    setTimeout(setStatus.off, 2000);
  }, [onCopy, setStatus]);

  return (
    <Tooltip
      aria-label="A tooltip"
      closeDelay={1000}
      closeOnClick={false}
      closeOnMouseDown={false}
      label={status ? 'Copied!' : 'Copy to clipboard'}
      onOpen={() => setStatus.off()}
    >
      <IconSvg
        _hover={{
          opacity: 0.9
        }}
        boxSize={4}
        cursor={'pointer'}
        name="copy"
        {...boxProps}
        onClick={handleCopy}
      />
    </Tooltip>
  );
};
