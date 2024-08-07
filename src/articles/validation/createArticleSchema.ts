// library
import { z as zod } from 'zod';

// constants
import { commentsFieldLengths } from './validationConstants';

export const createArticleSchema = zod
  .object({
    text: zod
      .string({
        required_error: 'Text is required',
        invalid_type_error: 'Age must be a string',
      })
      .min(commentsFieldLengths.text.min, {
        message: `Text must be ${commentsFieldLengths.text.min} or more characters long`,
      })
      .max(commentsFieldLengths.text.max, {
        message: `Text must be maximum ${commentsFieldLengths.text.max} characters long`,
      }),
  })
  .required();

export type CreateCatDto = zod.infer<typeof createArticleSchema>;
