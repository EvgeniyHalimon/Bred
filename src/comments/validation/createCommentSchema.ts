import { z as zod } from 'zod';
import { commentFieldLengths } from './validationConstants';

export const createCommentSchema = zod
  .object({
    text: zod
      .string({
        required_error: 'Text is required',
        invalid_type_error: 'Age must be a string',
      })
      .min(commentFieldLengths.text.min, {
        message: `Text must be ${commentFieldLengths.text.min} or more characters long`,
      })
      .max(commentFieldLengths.text.max, {
        message: `Text must be maximum ${commentFieldLengths.text.max} characters long`,
      }),
  })
  .required();

export type CreateCatDto = zod.infer<typeof createCommentSchema>;
