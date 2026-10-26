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
    export type Create = Database['public']['Tables']['posts']['Insert'];
    type Update = Database['public']['Tables']['posts']['Update'];
    export type Edit = Required<Omit<Update, 'author' | 'created_at' | 'id'>>;
};

export namespace Comment {
    export type Data = Database['public']['Tables']['comments']['Row'];
    export type Create = Database['public']['Tables']['comments']['Insert'];
    export type WithAuthor = Omit<Comment.Data, 'author'> & { author: Profile.Data };
}