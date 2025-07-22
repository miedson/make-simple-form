import { SimpleGrid, Box, IconButton } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useDragDropContext } from "../../contexts/drag-drop.context";
import { useRenderElement } from "../../hooks/use-render-element";
import { ConfigElement, type ConfigElementRef } from "../config-element";
import type { MovedElementValidationData } from "../config-element/form-config-element.schema";
import { X } from "lucide-react";
import { useColorModeValue } from "../../../../components/ui/color-mode";

type ContainerElementProps = {
    elementId: string;
    columns?: string | null | undefined;
    preview: boolean;
    view: boolean;
};

export function ContainerElement({ elementId, columns, preview, view }: ContainerElementProps) {
    const [dragOver, setDragOver] = useState(false);
    const configElementRef = useRef<ConfigElementRef>(null);
    const {
        movedElement,
        setIsOverContainer,
        elements,
        addChildElement,
        changeElement,
        removeChildElement
    } = useDragDropContext();

    const { renderElement } = useRenderElement();

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(true);
        setIsOverContainer(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
        setIsOverContainer(false);
    };

    const handleOnDrop = (e: React.DragEvent) => {
        e.stopPropagation();
        setIsOverContainer(false);
        if (movedElement && movedElement.type !== 'container') {
            addChildElement(movedElement, elementId)
            configElementRef.current?.open();
            setDragOver(false);
        }
    };

    const childElements = elements.find(el => el.id === elementId)?.elements ?? [];

    const onSave = (data: MovedElementValidationData) => {
        if (data && movedElement) {
            changeElement(movedElement.id, data, elementId);
        }
    }

    const onCancel = () => {
        if (movedElement) {
            removeChildElement(movedElement.id, elementId);
        }
    }

    const borderColor = useColorModeValue('gray.300', 'gray.600');
    const dragBorderColor = useColorModeValue('blue.400', 'blue.300');
    const borderHoverColor = useColorModeValue('blue.600', 'transparent');

    const shouldHideInPreview = preview && !view;

    return (
        <>
            <SimpleGrid
                columns={Number(columns)}
                w="full"
                minH="6rem"
                padding="0.5rem"
                bg={dragOver ? "blue.50" : "white"}
                border={shouldHideInPreview ? "2px dashed" : 'transparent'}
                borderColor={dragOver ? dragBorderColor : borderColor}
                borderRadius={4}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleOnDrop(e)}
                transition="all 0.2s"
                direction="column"
                gap="0.5rem"
            >
                {childElements.length > 0
                    ? childElements.map(child => (
                        <Box
                            key={child.id}
                            padding={'0.5rem'}
                            border="2px dashed"
                            borderColor={'transparent'}
                            borderRadius={'sm'}
                            _hover={shouldHideInPreview ? { borderColor: borderHoverColor } : {}}
                            position={'relative'}
                            className="group"
                        >
                            {child.isPreview && !view && (
                                <IconButton
                                    aria-label="Remover elemento filho"
                                    size="xs"
                                    bg={'red.400'}
                                    position="absolute"
                                    top="-2"
                                    right="-2"
                                    opacity={0}
                                    _groupHover={{ opacity: 1 }}
                                    onClick={() => removeChildElement(child.id, elementId)}
                                    transition="opacity 0.2s"
                                    zIndex={1}
                                >
                                    <X size={16} />
                                </IconButton>
                            )}
                            {renderElement(child)}
                        </Box>
                    ))
                    : null}
            </SimpleGrid>
            <ConfigElement ref={configElementRef} onSave={onSave} onCancel={onCancel} />
        </>
    );
}
