import { Button, CloseButton, Drawer, Field, Input, NumberInput, Portal, Stack, Switch } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDragDropContext } from '../../contexts/drag-drop.context';
import { OptionsFieldArray } from './components/options-field-array';
import {
  type MovedElementValidationData, getMovedElementValidationSchema
} from './form-config-element.schema';

export type ConfigElementRef = {
  open: () => void;
  close: () => void;
};

type ConfigElementProps = {
  onSave: (data: MovedElementValidationData) => void
  onCancel: () => void;
}

export const ConfigElement = forwardRef<ConfigElementRef, ConfigElementProps>(({ onSave, onCancel }, ref) => {
  const { movedElement } = useDragDropContext();
  const schema = useMemo(() => getMovedElementValidationSchema(movedElement?.type), [movedElement?.type]);

  const formMethods = useForm<MovedElementValidationData>({
    resolver: zodResolver(schema),
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = formMethods;
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));


  const handleCancel = () => {
    onCancel();
    setOpen(false);
  };

  const handleSave = (data: MovedElementValidationData) => {
    onSave(data);
    reset();
    setOpen(false);
  }

  const isColumns = watch('isColumns');

  return (
    <Drawer.Root open={open}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <FormProvider {...formMethods}>
            <Drawer.Content>
              <form onSubmit={handleSubmit(handleSave)} noValidate>
                <Drawer.Header>
                  <Drawer.Title>Configure o campo</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                  <Stack gap="8" maxW="sm">
                    {
                      movedElement?.type !== 'container' ? (
                        <>
                          <Field.Root orientation="vertical" required invalid={!!errors.label?.message}>
                            <Field.Label>
                              Título do campo
                              <Field.RequiredIndicator />
                            </Field.Label>
                            <Input placeholder="Ex: Nome completo	" {...register('label')} />
                            <Field.ErrorText>{errors.label?.message}</Field.ErrorText>
                          </Field.Root>

                          <Field.Root orientation="vertical" invalid={!!errors.placeholder?.message}>
                            <Field.Label>Texto de ajuda</Field.Label>
                            <Input
                              placeholder="Ex: Digite seu nome completo aqui"
                              {...register('placeholder')}
                            />
                            <Field.ErrorText>{errors.placeholder?.message}</Field.ErrorText>
                          </Field.Root>

                          {['select', 'radio', 'checkbox'].includes(movedElement?.type ?? '') ? (
                            <OptionsFieldArray />
                          ) : null}

                          <Field.Root orientation="horizontal">
                            <Field.Label>Este campo é obrigatório?</Field.Label>
                            <Controller
                              name="required"
                              control={control}
                              render={({ field }) => (
                                <Switch.Root
                                  name={field.name}
                                  checked={field.value}
                                  onCheckedChange={({ checked }) => field.onChange(checked)}
                                >
                                  <Switch.HiddenInput />
                                  <Switch.Control />
                                </Switch.Root>
                              )}
                            />
                          </Field.Root>
                        </>
                      ) : (
                        <>
                          <Field.Root orientation="horizontal">
                            <Field.Label>Colunas?</Field.Label>
                            <Controller
                              name="isColumns"
                              control={control}
                              render={({ field }) => (
                                <Switch.Root
                                  name={field.name}
                                  checked={field.value}
                                  onCheckedChange={({ checked }) => field.onChange(checked)}
                                >
                                  <Switch.HiddenInput />
                                  <Switch.Control />
                                </Switch.Root>
                              )}
                            />
                          </Field.Root>
                          {
                            isColumns && (
                              <Field.Root invalid={!!errors.columns}>
                                <Field.Label>Quantidade</Field.Label>
                                <Controller
                                  name="columns"
                                  control={control}
                                  defaultValue={'1'}
                                  render={({ field }) => (
                                    <NumberInput.Root
                                      w={'full'}
                                      disabled={field.disabled}
                                      name={field.name}
                                      value={field.value}
                                      onValueChange={({ value }) => {
                                        field.onChange(value)
                                      }}
                                    >
                                      <NumberInput.Control />
                                      <NumberInput.Input onBlur={field.onBlur} />
                                    </NumberInput.Root>
                                  )}
                                />
                                <Field.ErrorText>{errors.columns?.message}</Field.ErrorText>
                              </Field.Root>
                            )
                          }
                        </>
                      )
                    }
                  </Stack>
                </Drawer.Body>
                <Drawer.Footer>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancelar
                  </Button>
                  <Button type="submit">Salvar</Button>
                </Drawer.Footer>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" onClick={handleCancel} />
                </Drawer.CloseTrigger>
              </form>
            </Drawer.Content>
          </FormProvider>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
});

ConfigElement.displayName = 'ConfigElement';
