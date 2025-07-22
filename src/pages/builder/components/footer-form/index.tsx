import { Flex, IconButton, Text } from '@chakra-ui/react';
import { CircleArrowLeft, CircleArrowRight, SendHorizonal, type LucideProps } from 'lucide-react';
import { useCallback } from 'react';
import { Tooltip } from '../../../../components/ui/tooltip';
import type { Pagination } from '../../hooks/use-pagination';

type FooterFormProps = {
    preview: boolean;
    isLoading?: boolean;
    pagination: Omit<Pagination<Element>, 'paginatedData'> | undefined;
};

export function FooterForm({ preview, isLoading, pagination }: FooterFormProps) {
    const RenderButton = useCallback(
        ({
            tooltipText,
            icon: Icon,
            onClick,
            disabled,
        }: {
            tooltipText: string;
            icon: React.ForwardRefExoticComponent<
                Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
            >;
            onClick: () => void;
            disabled: boolean;
        }) => {
            return (
                <Tooltip content={tooltipText}>
                    <IconButton
                        variant={'solid'}
                        aria-label={tooltipText}
                        onClick={onClick}
                        disabled={disabled}
                    >
                        <Icon />
                    </IconButton>
                </Tooltip>
            );
        },
        []
    );

    return (
        <Flex gap={'1rem'} alignItems={'center'}>
            {pagination && (
                <>
                    <RenderButton
                        tooltipText="Página anterior"
                        onClick={pagination.prevPage}
                        icon={CircleArrowLeft}
                        disabled={!pagination.hasPrev}
                    />
                    <Text margin={'0 12px'}>
                        Página {pagination.page} de {pagination.totalPages}
                    </Text>
                    <RenderButton
                        tooltipText="Proxima página"
                        onClick={pagination.nextPage}
                        icon={CircleArrowRight}
                        disabled={!pagination.hasNext}
                    />
                </>
            )}
            {(pagination ? pagination.lastPage : true) && (
                <IconButton type="submit" loading={isLoading} disabled={preview} padding={'0.5rem'}>
                    <Flex gap={'0.5rem'}>
                        <Text>Enviar</Text>
                        <SendHorizonal />
                    </Flex>
                </IconButton>
            )}
        </Flex>
    );
}
