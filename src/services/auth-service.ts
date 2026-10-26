import { AuthSessionMissingError, type User as SupabaseUser } from '@supabase/supabase-js';
import supabase from '../lib/supabase.ts';
import type { Profile, User } from '../types/models.ts';

async function signUp (
    { email, password, name, username }: User.SignupData
): Promise<void> {
    // TODO: Add error handling
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
    const response = await supabase.auth.signInWithPassword({ email, password });
    if (response.error) throw response.error;
}

async function logOut (): Promise<void> {
    // TODO: Add error handling
    const response = await supabase.auth.signOut();
    if (response.error) throw response.error;
}

async function getCurrentUser (): Promise<SupabaseUser | null> {
    const response = await supabase.auth.getUser();

    if (response.error instanceof AuthSessionMissingError) {
        return null;
    } else if (response.error) throw response.error;

    return response.data.user;
}

async function getCurrentUserProfile (): Promise<Profile.Data | null> {
    const currentUser: SupabaseUser | null = await getCurrentUser();

    if (currentUser === null) return null;

    const response = await supabase
        .from('profiles')
        .select()
        .eq('user_id', currentUser.id);
    
    if (!response.success) throw response.error;
    
    return response.data.at(0)!;
}

const authService = {
    signUp,
    logIn,
    logOut,
    getCurrentUserProfile
};

export default authService;