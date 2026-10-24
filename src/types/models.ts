import type { Database } from './database.types.ts';

export namespace User {
    type Credentials = {
        email: string;
        password: string;
    };
    
    export type SignupData = Credentials & Omit<Profile.AddData, 'user_id'>
}

export namespace Profile {
    export type AddData = Database['public']['Tables']['profiles']['Insert'];
};

export namespace Post {
    export type Data = Database['public']['Tables']['posts']['Row'];
};