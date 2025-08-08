import { Button, CloseButton, Dialog, Flex, Portal, Text } from '@chakra-ui/react';
import { forwardRef, useImperativeHandle, useState } from 'react';

type ConfirmMessageModalProps = {
  title?: string;
  description: string;
  labelButtonConfirm?: string;
  labelButtonCancel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export type ConfirmMessageModalRef = {
  open: () => void;
  close: () => void;
};

export const ConfirmMessageModal = forwardRef<ConfirmMessageModalRef, ConfirmMessageModalProps>(
  ({ title, description, labelButtonConfirm = 'Confirmar', labelButtonCancel = 'Cancelar', onConfirm, onCancel }, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    return (
      <Dialog.Root
        placement={'center'}
        motionPreset="slide-in-bottom"
        open={open}
        size={'xs'}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              {
                title && (
                  <Dialog.Header paddingBlock={'0.5rem'} paddingTop={'1rem'}>
                    <Dialog.Title>{title}</Dialog.Title>
                  </Dialog.Header>
                )
              }
              <Dialog.Body paddingBlock={'2.5rem'}>
                <Flex flexDir={'column'} gap={'1rem'}>
                  <Text fontSize={'md'} fontWeight={'semibold'}>{description}</Text>
                  <Flex gap={'1rem'} justifyContent={'center'}>
                    <Button onClick={onConfirm}>{labelButtonConfirm}</Button>
                    <Button bg={'red.500'} _hover={{ bg: 'red.400' }} onClick={onCancel}>{labelButtonCancel}</Button>
                  </Flex>
                </Flex>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    );
  }
);

ConfirmMessageModal.displayName = 'ConfirmMessageModal';
