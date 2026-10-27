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
    
    if (!response.success) {
        throw response.error;
    }

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
    
    if (!response.success) {
        throw response.error;
    }

    const postData = response.data;
    return postData.at(0) ?? null;
}

async function create (
    { text }: Post.Create
): Promise<string> {
    const response = await supabase
        .from('posts')
        .insert({ text })
        .select()
        .single();

    if (!response.success) {
        throw response.error;
    }

    return response.data.id;
}

async function edit (
    postId: Post.Data['id'],
    { text }: Post.Edit
): Promise<void> {
    const response = await supabase
        .from('posts')
        .update({ text })
        .eq('id', postId);
    
    if (!response.success) {
        throw response.error;
    }
}

async function remove (
    postId: Post.Data['id']
): Promise<void> {
    const response = await supabase
        .from('posts')
        .delete().eq('id', postId);

    if (!response.success) {
        throw response.error;
    }
}

const postService = {
    getAll,
    getById,
    create,
    edit,
    remove
};

export default postService;