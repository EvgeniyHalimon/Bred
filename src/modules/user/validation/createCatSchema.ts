import { z as zod } from 'zod';

export const createCatSchema = zod
  .object({
    name: zod
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Age must be a string',
      })
      .min(2, { message: 'Must be 2 or more characters long' }),
    age: zod
      .number({
        required_error: 'Age is required',
        invalid_type_error: 'Age must be a number',
      })
      .min(0, { message: 'Must be greater that 0' }),
    breed: zod
      .string({
        required_error: 'Breed is required',
        invalid_type_error: 'Age must be a string',
      })
      .min(2, { message: 'Must be 2 or more characters long' }),
  })
  .required();

export type CreateCatDto = zod.infer<typeof createCatSchema>;
