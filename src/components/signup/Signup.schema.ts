import type { FormSchema } from '../../types/use-controlled-form.types.ts';
import * as zod from '@zod/mini';

const signupSchema = {
    name: {
        type: 'text',
        initialValue: '',
        validator (name) {
            const result = zod.string().check(
                zod.minLength(2, 'Name must be at least 2 characters long.')
            ).safeParse(name);

            return result.success
            ? []
            : zod.flattenError(result.error).formErrors;
        }
    },
    username: {
        type: 'text',
        initialValue: '',
        validator (username) {
            const result = zod.string().check(
                zod.minLength(3, 'Username must be at least 3 characters long.'),
                zod.regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores.')
            ).safeParse(username);

            return result.success
            ? []
            : zod.flattenError(result.error).formErrors;
        }
    },
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
                zod.minLength(6, 'Password must be at least 6 characters long.')
            ).safeParse(password);

            return result.success
            ? []
            : zod.flattenError(result.error).formErrors;
        }
    },
    repeatPassword: {
        type: 'password',
        initialValue: '',
        validator (repeatPassword) {
            const result = zod.string().check(
                zod.minLength(6, 'Password must be at least 6 characters long.')
            ).safeParse(repeatPassword);

            return result.success
            ? []
            : zod.flattenError(result.error).formErrors;
        }
    },
    isMinAge: {
        type: 'checkbox',
        initialValue: false,
        validator (isMinAge) {
            return isMinAge
                ? []
                : ['You must be at least 13 years old to sign up.'];
        }
    },
    agreeTerms: {
        type: 'checkbox',
        initialValue: false,
        validator (agreeTerms) {
            return agreeTerms
                ? []
                : ['You must agree to the Terms and Conditions to sign up.'];
        }
    }
} satisfies FormSchema;

export default signupSchema;