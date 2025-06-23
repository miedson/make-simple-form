import { Button, CloseButton, Drawer, Field, Input, Portal, Stack, Switch } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDragDropContext } from '../../contexts/drag-drop.context';
import {
  type MovedElementValidationData,
  movedElementValidationSchema,
} from './form-config-element.schema';
import { OptionsFieldArray } from './components/options-field-array';

export type ConfigElementRef = {
  open: () => void;
  close: () => void;
};

export const ConfigElement = forwardRef<ConfigElementRef>((_, ref) => {
  const formMethods = useForm<MovedElementValidationData>({
    resolver: zodResolver(movedElementValidationSchema),
  });
  const { register, control, handleSubmit, reset } = formMethods;
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  const { movedElement, changeElement, removeElementById } = useDragDropContext();

  const handleCancel = () => {
    movedElement && removeElementById(movedElement?.id);
    setOpen(false);
  };

  const handleSave = (data: MovedElementValidationData) => {
    if (data && movedElement) {
      changeElement(movedElement.id, data);
      setOpen(false);
      reset();
    }
  };

  return (
    <Drawer.Root open={open}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <FormProvider {...formMethods}>
            <Drawer.Content as={'form'} onSubmit={handleSubmit(handleSave)}>
              <Drawer.Header>
                <Drawer.Title>Configure o campo</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Stack gap="8" maxW="sm">
                  <Field.Root orientation="vertical">
                    <Field.Label>Título do campo</Field.Label>
                    <Input placeholder="Ex: Nome completo	" {...register('label')} />
                  </Field.Root>

                  <Field.Root orientation="vertical">
                    <Field.Label>Identificador interno</Field.Label>
                    <Input placeholder="Ex: nome_completo" {...register('name')} />
                  </Field.Root>

                  <Field.Root orientation="vertical">
                    <Field.Label>Texto de ajuda</Field.Label>
                    <Input
                      placeholder="Ex: Digite seu nome completo aqui"
                      {...register('placeholder')}
                    />
                  </Field.Root>

                  {['select', 'radio', 'checkbox'].includes(movedElement?.type ?? '') && (
                    <OptionsFieldArray />
                  )}

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
            </Drawer.Content>
          </FormProvider>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
});
