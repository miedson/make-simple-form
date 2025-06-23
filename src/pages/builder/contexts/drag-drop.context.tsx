import { createContext, useContext, useState, type ReactNode } from 'react';
import type { MovedElementValidationData } from '../components/config-element/form-config-element.schema';
import type { Element } from '../types/element.type';

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

  const addElement = (element: Element) => {
    setElements([...elements, element]);
  };

  const changeElement = (id: string, data: MovedElementValidationData) => {
    const elementsUpdated = elements.map((element) =>
      element.id === id ? { ...element, ...data } : element
    );
    setElements(elementsUpdated);
  };

  const removeElementById = (id: string) => {
    const elementsFiltered = elements.filter((element) => element.id !== id);
    setElements(elementsFiltered);
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
