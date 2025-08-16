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
  upElement: (id: string) => void;
  downElement: (id: string) => void
};

export const DragDropContext = createContext<DragDropContextType>({} as DragDropContextType);

export function DragDropProvider({ children }: { children: ReactNode }) {
  const [movedElement, setMovedElement] = useState<Element>();
  const [elements, setElements] = useState<Element[]>([]);
  const { getLocalStorageData, updateLocalStore } = useLocalStorage<FormData>();
  const [localStorageData, setLocalStorageData] = useState<FormData | undefined>();
  const updated = false;

  useEffect(() => {
    const localStorageData = getLocalStorageData('form');
    setLocalStorageData(localStorageData);
    if (!elements.length && localStorageData) {
      setElements(localStorageData.elements ?? []);
    }
  }, []);

  const addElement = (element: Element) => {
    const nextPosition = elements.reduce(
      (max, el) => Math.max(max, el.position),
      0
    ) + 1;
    setElements([...elements, { ...element, position: nextPosition }]);
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

  const changePosition = (id: string, direction: "up" | "down") => {
    const element = elements.find(el => el.id === id);
    if (!element) return;

    const actualPosition = element.position;
    const newPosition = direction === "up" ? actualPosition - 1 : actualPosition + 1;

    if (newPosition < 1 || newPosition > elements.length) {
      return;
    }

    const elementsUpdated = elements.map(el => {
      if (el.id === id) {
        return { ...el, position: newPosition };
      }

      if (el.position === newPosition) {
        return { ...el, position: actualPosition };
      }

      return el;
    });

    const elementsSorted = elementsUpdated.sort((a, b) => a.position - b.position);
    setElements(elementsSorted);

    if (localStorageData) {
      updateLocalStore('form', { ...localStorageData, elements, updated });
    }
  };

  const upElement = (id: string) => changePosition(id, "up");
  const downElement = (id: string) => changePosition(id, "down");

  return (
    <DragDropContext.Provider
      value={{
        movedElement,
        setMovedElement,
        elements,
        addElement,
        changeElement,
        removeElementById,
        upElement,
        downElement
      }}
    >
      {children}
    </DragDropContext.Provider>
  );
}

export const useDragDropContext = () => useContext(DragDropContext);
