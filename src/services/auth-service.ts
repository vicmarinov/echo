import { AuthSessionMissingError, type User as SupabaseUser } from '@supabase/supabase-js';
import supabase from '../lib/supabase.ts';
import type { Profile, User } from '../types/models.ts';

async function signUp (
    { email, password, name, username }: User.SignupData
): Promise<void> {
    const response = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { name, username }
        }
    });

    if (response.error) {
        throw response.error;
    }
}

async function logIn (
    { email, password }: User.LoginData
): Promise<void> {
    const response = await supabase.auth
        .signInWithPassword({ email, password });
    
    if (response.error) {
        throw response.error;
    }
}

async function logOut (): Promise<void> {
    const response = await supabase.auth.signOut();
    if (response.error) throw response.error;
}

async function getCurrentUser (): Promise<SupabaseUser | null> {
    const response = await supabase.auth.getUser();

    if (response.error instanceof AuthSessionMissingError) {
        return null;
    } else if (response.error) {
        throw response.error;
    }

    return response.data.user;
}

async function getCurrentUserProfile (): Promise<Profile.Data | null> {
    const currentUser: SupabaseUser | null = await getCurrentUser();

    if (currentUser === null) return null;

    const response = await supabase
        .from('profiles')
        .select()
        .eq('user_id', currentUser.id);
    
    if (!response.success) {
        throw response.error;
    }
    
    return response.data.at(0)!;
}

async function getUserProfileByUsername (
    username: Profile.Data['username'],
    abortController: AbortController
): Promise<Profile.WithPosts | null> {
    const response = await supabase
        .from('profiles')
        .select(`*, posts ( *, author ( * ) )`)
        .eq('username', username)
        .abortSignal(abortController.signal)
        .single();
    
    if (!response.success) {
        throw response.error;
    }

    const profileData = response.data;
    profileData.posts
        .sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateB.getTime() - dateA.getTime();
        });

    return profileData;
}

const authService = {
    signUp,
    logIn,
    logOut,
    getCurrentUserProfile,
    getUserProfileByUsername
};

export default authService;