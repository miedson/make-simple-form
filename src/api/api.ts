import axios from 'axios';
import type { FormData } from '../pages/builder/types/form-data.type';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const formService = {
  create: async (data: FormData) => await api.post('/form', data).catch((error) => console.log(error)),
  findById: async (id: string): Promise<FormData> => await api.get<FormData>(`form/${id}`)
  .then((response) => response.data)
  .catch((error) => {throw error})
};
