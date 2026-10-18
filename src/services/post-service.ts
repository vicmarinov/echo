import supabase from '../lib/supabase.ts';
import type { PostData } from '../types/models.ts';

async function getAll (): Promise<PostData[] | null> {
    // TODO: Add error handling
    const response = await supabase
        .from('posts')
        .select()
        .order('created_at', { ascending: false });
    
    return response.data;
}

const postService = {
    getAll
};

export default postService;