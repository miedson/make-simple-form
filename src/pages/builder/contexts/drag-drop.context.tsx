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
  changeElement: (id: string, data: MovedElementValidationData) => void;
  removeElementById: (id: string) => void;
};

export const DragDropContext = createContext<DragDropContextType>({} as DragDropContextType);

export function DragDropProvider({ children }: { children: ReactNode }) {
  const [movedElement, setMovedElement] = useState<Element>();
  const [elements, setElements] = useState<Element[]>([]);
  const { getLocalStorageData, updateLocalStore } = useLocalStorage<FormData>();
  const [localStorageData, setLocalStorageData] = useState<FormData | undefined>();
  const updated = false;

  useEffect(() => {
    setLocalStorageData(getLocalStorageData('form'));
    if (!elements.length && localStorageData) {
      setElements(localStorageData.elements ?? []);
    }
  }, []);

  const addElement = (element: Element) => {
    setElements([...elements, element]);
    if (localStorageData) {
      updateLocalStore('form', { ...localStorageData, elements, updated });
    }
  };

  const changeElement = (id: string, data: MovedElementValidationData) => {
    const elementsUpdated = elements.map((element) =>
      element.id === id ? { ...element, ...data } : element
    );
    setElements(elementsUpdated);
    if (localStorageData) {
      updateLocalStore('form', { ...localStorageData, elements: elementsUpdated, updated });
    }
  };

  const removeElementById = (id: string) => {
    const elementsFiltered = elements.filter((element) => element.id !== id);
    setElements(elementsFiltered);
    if (localStorageData) {
      updateLocalStore('form', { ...localStorageData, elements: elementsFiltered, updated });
    }
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
      }}
    >
      {children}
    </DragDropContext.Provider>
  );
}

export const useDragDropContext = () => useContext(DragDropContext);
