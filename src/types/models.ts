import type { Database } from './database.types.ts';

export namespace User {
    type Credentials = {
        email: string;
        password: string;
    };
    
    export type SignupData = Credentials & Omit<Profile.AddData, 'user_id'>
    export type LoginData = Credentials;
}

export namespace Profile {
    export type Data = Database['public']['Tables']['profiles']['Row'];
    export type AddData = Database['public']['Tables']['profiles']['Insert'];
};

export namespace Post {
    export type Data = Database['public']['Tables']['posts']['Row'];
    export type WithAuthor = Omit<Post.Data, 'author'> & { author: Profile.Data; };
};