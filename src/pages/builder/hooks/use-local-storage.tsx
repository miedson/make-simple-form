
import type { FormData } from '../types/form-data.type';

export function useDataFormLocalStorage() {
    const dataFormLocalStorage = localStorage.getItem('form');
    const localStorageFormData = dataFormLocalStorage ? JSON.parse(dataFormLocalStorage) as FormData : undefined;

    const updateFormLocalStore = (newDataForm: FormData) => localStorage.setItem('form', JSON.stringify({ ...newDataForm }));

    return { localStorageFormData, updateFormLocalStore };
}