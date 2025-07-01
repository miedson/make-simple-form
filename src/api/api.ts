import axios from 'axios';
import type { FormData } from '../pages/builder/types/form-data.type';

export const baseURL = import.meta.env.VITE_BACKEND_URL

const api = axios.create({
  baseURL
});

export const formService = {
  create: async (data: FormData) =>
    await api.post('/form', data).catch((error) => console.log(error)),

  findById: async (id: string): Promise<FormData> =>
    await api
      .get<FormData>(`form/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),

  publish: async (id: string) =>
    await api
      .put(`/form/${id}/publish`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
};
