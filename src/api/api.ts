import axios from 'axios';
import type { FormData } from '../pages/builder/types/form-data.type';

export const baseURL = import.meta.env.VITE_BACKEND_URL;
export const appURL = import.meta.env.VITE_APP_URL;

const api = axios.create({
  baseURL,
});

type OptionResponseType = {
  description: string | undefined;
  value: string | undefined;
};

export type Responses = {
  element_id: string;
  question: string | null | undefined;
  response: string | string[] | OptionResponseType[];
};

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

export const responseService = {
  save: async (formId: string, data: Responses[]) => {
    await api.post(`responses/${formId}/save`, data).catch((error) => {
      throw error;
    });
  },
};
