import { z, type ZodSchema } from 'zod';
import type { Element } from '../../types/element.type';

export function generateSchema(elements: Element[]) {
  const shape: Record<string, ZodSchema> = {};
  const string = z.string().nonempty();
  const stringArray = z.array(z.string()).min(1);
  const optional = z.string().optional();

  const getSchemaElement = (element: Element) => {
    const schemas = {
      input: element.required ? string : optional,
      textarea: element.required ? string : optional,
      radio: element.required ? string : optional,
      select: element.required ? stringArray : optional,
      checkbox: element.required ? stringArray : optional,
  }
    return schemas[element.type as keyof typeof schemas] ?? z.any();
}

  for(const element of elements) {
    if(element.id) shape[element.id] = getSchemaElement(element);
  }
  
  return z.object(shape);
}
