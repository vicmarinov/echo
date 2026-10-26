import type { Post } from '../../../../types/models.ts';
import type { FormSchema } from '../../../../types/use-controlled-form.types.ts';
import * as zod from '@zod/mini';

export default function getEditPostSchema ({ text }: Post.Edit) {
    const editPostSchema = {
        text: {
            type: 'textarea',
            initialValue: text,
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

    return editPostSchema;
}