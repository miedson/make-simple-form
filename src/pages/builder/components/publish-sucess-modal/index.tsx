import { CloseButton, Dialog, Group, IconButton, Input, Portal } from '@chakra-ui/react';
import { Check, Clipboard } from 'lucide-react';
import { forwardRef, useImperativeHandle, useState } from 'react';

type PublishSuccessModalProps = {
  url: string;
};

export type PublishSuccessModalRef = {
  open: () => void;
  close: () => void;
};

export const PublishSuccessModal = forwardRef<PublishSuccessModalRef, PublishSuccessModalProps>(
  ({ url }, ref) => {
    const [open, setOpen] = useState(false);
    const [icon, setIcon] = useState(<Clipboard />);

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    const handleCopy = () => {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setIcon(<Check />);
          setTimeout(() => {
            setIcon(<Clipboard />);
          }, 3000);
        })
        .catch((error) => console.error(error));
    };

    return (
      <Dialog.Root
        placement={'center'}
        motionPreset="slide-in-bottom"
        open={open}
        size={'sm'}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header paddingBlock={'0.5rem'} paddingTop={'1rem'}>
                <Dialog.Title>Publicado</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Group attached w="full">
                  <Input flex="1" value={url} disabled />
                  <IconButton onClick={handleCopy}>{icon}</IconButton>
                </Group>
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

PublishSuccessModal.displayName = 'PublishSuccessModal';
