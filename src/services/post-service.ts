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
    postId: Post.Data['id'],
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

async function create (
    { text }: Post.Create,
    abortController: AbortController
): Promise<string> {
    const response = await supabase
        .from('posts')
        .insert({ text })
        .select()
        .abortSignal(abortController.signal);

    // TODO: Add error handling
    if (!response.success) throw response.error;

    const createdPost = response.data.at(0) as Post.Data;
    return createdPost.id;
}

async function edit (
    postId: Post.Data['id'],
    { text }: Post.Edit,
    abortController: AbortController
): Promise<void> {
    const response = await supabase
        .from('posts')
        .update({ text })
        .eq('id', postId)
        .abortSignal(abortController.signal);
    
    // TODO: Add error handling
    if (!response.success) throw response.error;
}

const postService = {
    getAll,
    getById,
    create,
    edit
};

export default postService;