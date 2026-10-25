import supabase from '../lib/supabase.ts';
import type { Post } from '../types/models.ts';

async function getAll (
    abortController: AbortController
): Promise<Post.WithAuthor[]> {
    const response = await supabase
        .from('posts')
        .select(`*, author ( * )`)
        .order('created_at', { ascending: false })
        .abortSignal(abortController.signal);
    
    // TODO: Add error handling
    if (!response.success) throw response.error;

    return response.data;
}

async function getById (
    postId: string,
    abortController: AbortController
): Promise<Post.WithAuthor | null> {
    const response = await supabase
        .from('posts')
        .select(`*, author ( * )`)
        .eq('id', postId)
        .abortSignal(abortController.signal);
    
    // TODO: Add error handling
    if (!response.success) throw response.error;

    const postData = response.data;
    return postData.at(0) ?? null;
}

const postService = {
    getAll,
    getById
};

export default postService;