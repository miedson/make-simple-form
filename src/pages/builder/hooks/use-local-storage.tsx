
export function useLocalStorage<T>() {
  const getLocalStorageData = (name: string) => {
    const dataLocalStorage = localStorage.getItem(name) ?? localStorage.setItem(name, '');
    return dataLocalStorage
      ? (JSON.parse(dataLocalStorage) as T)
      : undefined;
  }

  const updateLocalStore = (name: string, newData: T) =>
    localStorage.setItem(name, JSON.stringify({ ...newData }));

  return { getLocalStorageData, updateLocalStore };
}
