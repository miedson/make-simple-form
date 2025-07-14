import { Flex, Button } from "@chakra-ui/react";

type FooterFormProps = {
    preview: boolean;
    isLoading?: boolean;
    clearAllFields?: () => void;
}
export function FooterForm({ preview, isLoading, clearAllFields }: FooterFormProps) {
    return (
        <Flex gap={'1rem'}>
            <Button type="submit" loading={isLoading} disabled={preview}>
                Enviar
            </Button>
            <Button variant={'outline'} onClick={clearAllFields} disabled={preview}>
                Limpar
            </Button>
        </Flex>
    )
}