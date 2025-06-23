import { Button, Field, Flex, Input, Text } from '@chakra-ui/react';
import { Save, Upload } from 'lucide-react';
import { Tooltip } from '../../../../components/ui/tooltip';
import { MoreSettingsForm } from './components/more-settings-form';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { headerFormSchema, type HeaderFormData } from './header-form.schema';
import { useHeaderFormContext } from '../../contexts/header-form.context';
import { useEffect } from 'react';

export function HeaderBuilder() {
  const formMethods = useForm<HeaderFormData>({
    resolver: zodResolver(headerFormSchema),
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = formMethods;
  const { setFormData } = useHeaderFormContext();

  const name = watch('name');
  const description = watch('description');

  useEffect(() => {
    setFormData({ name, description });
  }, [name, description]);

  const handleSave = (data: HeaderFormData) => {
    console.log(data);
  };

  return (
    <Flex
      w={'full'}
      h={'6.563rem'}
      paddingBlock={'1rem'}
      paddingInline={'1.5rem'}
      borderBottom={'1px solid'}
      borderColor={'gray.200'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Text fontSize={'3xl'} fontWeight={'bold'} lineHeight={'1.2rem'} color={'brand.600'}>
        MakeSimpleForm
      </Text>
      <FormProvider {...formMethods}>
        <Flex
          as={'form'}
          maxH={'4.563rem'}
          gap={'1rem'}
          alignItems={'start'}
          onSubmit={handleSubmit(handleSave)}
        >
          <Field.Root orientation={'horizontal'} invalid={!!errors.name} flexDir={'column'}>
            <Input placeholder="Novo formulário" {...register('name')} />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>
          <Flex gap={'1rem'} alignItems={'center'}>
            <Tooltip content={'Mais configurações'}>
              <Flex color={'blue.600'} cursor={'pointer'}>
                <MoreSettingsForm />
              </Flex>
            </Tooltip>
            <Button type="submit" colorPalette="brand" variant="solid">
              <Save /> Salvar
            </Button>
            <Button colorPalette="brand" variant="outline">
              <Upload /> Publicar
            </Button>
          </Flex>
        </Flex>
      </FormProvider>
    </Flex>
  );
}
