import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types.ts';

const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseURL || typeof supabaseURL !== 'string') {
    throw new Error('Supabase URL is not defined or is not a string. Please check your environment variables.');
}

if (!supabaseKey || typeof supabaseKey !== 'string') {
    throw new Error('Supabase Key is not defined or is not a string. Please check your environment variables.');
}

const supabase = createClient<Database>(supabaseURL, supabaseKey);

export default supabase;