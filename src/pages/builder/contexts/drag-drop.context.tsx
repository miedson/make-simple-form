import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { MovedElementValidationData } from '../components/config-element/form-config-element.schema';
import { useLocalStorage } from '../hooks/use-local-storage';
import type { Element } from '../types/element.type';
import type { FormData } from '../types/form-data.type';

type DragDropContextType = {
  movedElement?: Element;
  setMovedElement: (element: Element | undefined) => void;
  elements: Element[];
  addElement: (element: Element) => void;
  changeElement: (id: string, data: MovedElementValidationData, parentId?: string) => void;
  removeElementById: (id: string) => void;
  isOverContainer: boolean;
  setIsOverContainer: (isOverContainer: boolean) => void;
  addChildElement: (element: Element, parentId: string) => void;
  removeChildElement: (childId: string, parentId: string) => void
};

export const DragDropContext = createContext<DragDropContextType>({} as DragDropContextType);

export function DragDropProvider({ children }: { children: ReactNode }) {
  const [movedElement, setMovedElement] = useState<Element>();
  const [elements, setElements] = useState<Element[]>([]);
  const { getLocalStorageData, updateLocalStore } = useLocalStorage<FormData>();
  const [localStorageData, setLocalStorageData] = useState<FormData | undefined>();
  const [isOverContainer, setIsOverContainer] = useState(false);

  useEffect(() => {
    const localStorageData = getLocalStorageData('form');
    setLocalStorageData(localStorageData);
    if (!elements.length && localStorageData) {
      setElements(localStorageData.elements ?? []);
    }
  }, []);

  const addElement = (element: Element) => {
    setElements([...elements, element]);
    if (localStorageData) {
      updateLocalStore('form', { ...localStorageData, elements, updated: false });
    }
  };

  const addChildElement = (element: Element, parentId: string) => {
    console.log(element);
    setElements(prevElements => {
      return prevElements.map(el => {
        if (el.id === parentId) {
          const updatedChildren = [...(el.elements || []), element];
          return { ...el, elements: updatedChildren };
        }
        return el;
      });
    });
  };

  const changeElement = (
    id: string,
    data: MovedElementValidationData,
    parentId?: string
  ) => {
    const updateNestedElement = (nodes: Element[]): Element[] => {
      return nodes.map((el) => {
        if (el.id === id) {
          return { ...el, ...data };
        }

        if (el.elements && el.elements.length > 0) {
          return {
            ...el,
            elements: updateNestedElement(el.elements)
          };
        }

        return el;
      });
    };

    const elementsUpdated = parentId
      ? updateNestedElement(elements)
      : elements.map((el) =>
        el.id === id ? { ...el, ...data } : el
      );

    setElements(elementsUpdated);

    if (localStorageData) {
      updateLocalStore('form', {
        ...localStorageData,
        elements: elementsUpdated,
        updated: false
      });
    }
  };


  const removeElementById = (id: string) => {
    const elementsFiltered = elements.filter((element) => element.id !== id);
    setElements(elementsFiltered);
    if (localStorageData) {
      updateLocalStore('form', { ...localStorageData, elements: elementsFiltered, updated: false });
    }
  };

  const removeChildElement = (childId: string, parentId: string) => {
    setElements(prevElements => {
      return prevElements.map(el => {
        if (el.id === parentId) {
          const updatedChildren = (el.elements || []).filter(child => child.id !== childId);
          return { ...el, elements: updatedChildren };
        }
        return el;
      });
    });
  };

  return (
    <DragDropContext.Provider
      value={{
        movedElement,
        setMovedElement,
        elements,
        addElement,
        changeElement,
        removeElementById,
        isOverContainer,
        setIsOverContainer,
        addChildElement,
        removeChildElement
      }}
    >
      {children}
    </DragDropContext.Provider>
  );
}

export const useDragDropContext = () => useContext(DragDropContext);
