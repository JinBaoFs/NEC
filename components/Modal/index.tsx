import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  BoxProps,
  // ModalHeader,
  ModalProps,
  Box,
  ModalCloseButton
} from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

const NECModal = ({
  isOpen,
  onClose,
  children,
  header,
  showClose,
  bodyBoxProps,
  ...modalProps
}: {
  bodyBoxProps?: BoxProps;
  isOpen: boolean;
  onClose: () => void;
  showClose?: boolean;
  header?: () => React.ReactNode | string;
} & PropsWithChildren &
  ModalProps) => {
  return (
    <>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        {...modalProps}
      >
        <ModalOverlay />
        <ModalContent
          backdropFilter={'8px'}
          bg={'rgba(5, 5, 5, 0.90)'}
          borderRadius={'4xl'}
          boxShadow={
            '0px 37.5px 75px 0px rgba(255, 255, 255, 0.15) inset, 0px 3.75px 7.5px 0px rgba(0, 0, 0, 0.05), 0px 11.25px 22.5px 0px rgba(0, 0, 0, 0.05), 0px 22.5px 45px 0px rgba(0, 0, 0, 0.10)'
          }
          mixBlendMode={'screen'}
        >
          {/* <ModalHeader
            color={'#fff'}
            fontSize={'16px'}
          >
            {header?.()}
          </ModalHeader> */}
          {showClose && <ModalCloseButton zIndex={'1'} />}
          <ModalBody
            {...bodyBoxProps}
            pos={'relative'}
            px={'50px'}
            py={'50px'}
          >
            <Box
              fontSize={'sm'}
              mb={'7.5'}
              textAlign={'center'}
            >
              {header?.()}
            </Box>
            <Box>{children}</Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NECModal;
