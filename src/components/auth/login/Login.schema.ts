import type { FormSchema } from '../../../types/use-controlled-form.types.ts';
import * as zod from '@zod/mini';

const loginSchema = {
    email: {
        type: 'email',
        initialValue: '',
        validator (email) {
            const result = zod.string().check(
                zod.email('Please enter a valid email address.')
            ).safeParse(email);

            return result.success
            ? []
            : zod.flattenError(result.error).formErrors;
        }
    },
    password: {
        type: 'password',
        initialValue: '',
        validator (password) {
            const result = zod.string().check(
                zod.minLength(1, 'Password is required.')
            ).safeParse(password);

            return result.success
            ? []
            : zod.flattenError(result.error).formErrors;
        }
    }
} satisfies FormSchema;

export default loginSchema;