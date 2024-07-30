import { z as zod } from 'zod';
import { userFieldLengths } from './validationConstants';

export const createCatSchema = zod
  .object({
    firstName: zod
      .string({
        required_error: 'First name is required',
        invalid_type_error: 'Age must be a string',
      })
      .min(userFieldLengths.firstName.min, {
        message: `First name must be ${userFieldLengths.firstName.min} or more characters long`,
      })
      .max(userFieldLengths.firstName.max, {
        message: `First name must be maximum ${userFieldLengths.firstName.max} characters long`,
      }),
    lastName: zod
      .string({
        required_error: 'Last name is required',
        invalid_type_error: 'Age must be a string',
      })
      .min(userFieldLengths.lastName.min, {
        message: `Last name must be ${userFieldLengths.lastName.min} or more characters long`,
      })
      .max(userFieldLengths.lastName.max, {
        message: `Last name must be maximum ${userFieldLengths.lastName.max} characters long`,
      }),
    email: zod.string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    }),
    password: zod
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .min(userFieldLengths.password.min, {
        message: `Password must be ${userFieldLengths.password.min} or more characters long`,
      }),
    bio: zod
      .string({
        required_error: 'Bio is required',
        invalid_type_error: 'Bio must be a string',
      })
      .min(userFieldLengths.bio.min, {
        message: `Bio must be ${userFieldLengths.bio.min} or more characters long`,
      })
      .max(userFieldLengths.bio.max, {
        message: `Bio must be maximum ${userFieldLengths.bio.max} characters long`,
      }),
    photo: zod.string().optional(),
  })
  .required();

export type CreateCatDto = zod.infer<typeof createCatSchema>;
