import supabase from '../lib/supabase.ts';
import type { Post } from '../types/models.ts';

async function getAll (
    abortController: AbortController
): Promise<Post.Data[] | null> {
    // TODO: Add error handling
    const response = await supabase
        .from('posts')
        .select()
        .order('created_at', { ascending: false })
        .abortSignal(abortController.signal);
    
    return response.data;
}

async function getById (
    postId: string,
    abortController: AbortController
): Promise<Post.WithProfile | null> {
    // TODO: Add error handling
    const response = await supabase
        .from('posts')
        .select(`
            *,
            author ( * )
        `)
        .eq('id', postId)
        .abortSignal(abortController.signal);
    
    const postData = response.data;
    return postData === null ? null : postData[0];
}

const postService = {
    getAll,
    getById
};

export default postService;