import { Field, Input, Stack, Flex, Button, CloseButton } from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { MovedElementValidationData } from '../../form-config-element.schema';

export function OptionsFieldArray() {
  const { register, control } = useFormContext<MovedElementValidationData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  return (
    <Stack gap={4} maxW={'sm'}>
      {fields.map((field, index) => (
        <Flex key={field.id} gap="2" align="flex-end">
          <Field.Root orientation="vertical">
            <Field.Label>Descrição</Field.Label>
            <Input {...register(`options.${index}.label`)} placeholder="Ex: Opção1" />
          </Field.Root>

          <Field.Root orientation="vertical">
            <Field.Label>Valor</Field.Label>
            <Input {...register(`options.${index}.value`)} placeholder="1" />
          </Field.Root>

          <CloseButton onClick={() => remove(index)} />
        </Flex>
      ))}

      <Button onClick={() => append({ label: '', value: '' })}>Adicionar opção</Button>
    </Stack>
  );
}
