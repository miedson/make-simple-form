import type { Element } from './element.type';

export type FormData = {
  id?: string;
  name: string | null;
  description: string | null;
  updated?: boolean;
  elements?: Element[];
};
