import { Popover, Portal, Text, Textarea } from '@chakra-ui/react';
import { Settings } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import type { HeaderFormData } from '../header-form.schema';

export function MoreSettingsForm() {
  const { register } = useFormContext<HeaderFormData>();

  return (
    <Popover.Root>
      <Popover.Trigger w={'2rem'} h={'2rem'} padding={'0.3rem'} borderRadius={4} _hover={{ bg: 'blue.100', cursor: 'pointer' }} cursor={'pointer'} asChild>
        <Settings />
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              <Text my="4">Você pode informar um texto descritivo para este formulário.</Text>
              <Textarea size="md" placeholder="Digite um texto de descrição" {...register('description')} />
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
