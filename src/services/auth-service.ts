import supabase from '../lib/supabase.ts';
import type { User } from '../types/models.ts';

async function signUp (
    { email, password, name, username }: User.SignupData
): Promise<void> {
    // TODO: Add error handling
    // TODO: Store the current user
    const response = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { name, username }
        }
    });

    if (response.error) throw response.error;
}

async function logIn (
    { email, password }: User.LoginData
): Promise<void> {
    // TODO: Add error handling
    // TODO: Store the current user
    const response = await supabase.auth.signInWithPassword({ email, password });
    if (response.error) throw response.error;
}

const authService = {
    signUp,
    logIn
};

export default authService;