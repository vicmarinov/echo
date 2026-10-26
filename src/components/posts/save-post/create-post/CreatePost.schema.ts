import type { FormSchema } from '../../../../types/use-controlled-form.types.ts';
import * as zod from '@zod/mini';

const createPostSchema = {
    text: {
        type: 'textarea',
        initialValue: '',
        validator (text) {
            const result = zod.string().check(
                zod.minLength(1, 'Post text cannot be empty.'),
                zod.maxLength(280, 'Post text cannot exceed 280 characters.')
            ).safeParse(text);

            return result.success
                ? []
                : zod.flattenError(result.error).formErrors;
        }
    }
} satisfies FormSchema;

export default createPostSchema