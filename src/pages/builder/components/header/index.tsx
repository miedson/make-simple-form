import { Button, Field, Flex, Input, Text } from '@chakra-ui/react';
import { Save, Upload } from 'lucide-react';
import { Tooltip } from '../../../../components/ui/tooltip';
import { MoreSettingsForm } from './components/more-settings-form';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { headerFormSchema, type HeaderFormData } from './header-form.schema';
import { useHeaderFormContext } from '../../contexts/header-form.context';
import { useEffect } from 'react';

export function BuilderHeader() {
  const { formData, formDataPreview, setFormDataPreview, save, publish, isLoading } =
    useHeaderFormContext();

  const formMethods = useForm<HeaderFormData>({
    resolver: zodResolver(headerFormSchema),
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = formMethods;

  const name = watch('name');
  const description = watch('description');

  useEffect(() => {
    setFormDataPreview({ name, description, updated: false, published: formData?.published });
  }, [name, description]);

  useEffect(() => {
    reset({
      name: formData?.name ?? '',
      description: formData?.description ?? '',
    });
  }, [formData, reset]);

  const handleSave = (data: HeaderFormData) => {
    save(data);
  };

  return (
    <Flex
      flexDir={{ base: 'column', md: 'row' }}
      w={'full'}
      h={'6.563rem'}
      paddingBlock={'1rem'}
      paddingInline={'1.5rem'}
      borderBottom={'1px solid'}
      borderColor={'gray.200'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Text
        fontSize={'3xl'}
        fontWeight={'bold'}
        lineHeight={'1.2rem'}
        color={'brand.600'}
        mr={'1rem'}
      >
        MakeSimpleForm
      </Text>
      <FormProvider {...formMethods}>
        <Flex
          as={'form'}
          maxH={'4.563rem'}
          gap={{ sm: '0.5rem', md: '1rem' }}
          alignItems={'start'}
          onSubmit={handleSubmit(handleSave)}
        >
          <Field.Root orientation={'horizontal'} invalid={!!errors.name} flexDir={'column'}>
            <Input placeholder="Novo formulário" {...register('name')} />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>
          <Flex gap={{ sm: '0.5rem', md: '1rem' }} alignItems={'center'}>
            <Tooltip content={'Mais configurações'}>
              <Flex color={'blue.600'} cursor={'pointer'}>
                <MoreSettingsForm />
              </Flex>
            </Tooltip>
            <Button
              type="submit"
              colorPalette="brand"
              variant="solid"
              disabled={formDataPreview?.updated}
              loading={isLoading}
            >
              <Save /> Salvar
            </Button>
            <Button
              colorPalette="brand"
              variant="outline"
              onClick={publish}
              disabled={formData?.published}
            >
              <Upload /> Publicar
            </Button>
          </Flex>
        </Flex>
      </FormProvider>
    </Flex>
  );
}
