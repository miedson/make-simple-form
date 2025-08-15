import { Field, Input, Stack, Flex, Button, CloseButton } from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { MovedElementValidationData } from '../../form-config-element.schema';

export function OptionsFieldArray() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<MovedElementValidationData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  return (
    <Stack>
      <Field.Root invalid={!!errors.options?.root?.message}>
        {fields.map((field, index) => (
          <Flex key={field.id} gap="2" align="flex-end">
            <Field.Root orientation="vertical">
              <Field.Label>Descrição</Field.Label>
              <Input {...register(`options.${index}.label`)} placeholder="Ex: Nome da opção" />
            </Field.Root>

            <CloseButton onClick={() => remove(index)} />
          </Flex>
        ))}

        <Button w={'full'} onClick={() => append({ label: '', value: crypto.randomUUID() })}>
          Adicionar opção
        </Button>
        <Field.ErrorText>{errors.options?.root?.message}</Field.ErrorText>
      </Field.Root>
    </Stack>
  );
}
