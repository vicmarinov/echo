import supabase from '../lib/supabase.ts';
import type { Comment } from '../types/models.ts';

async function getAllByPostId (
    postId: Comment.Data['post_id'],
    abortController: AbortController
): Promise<Comment.WithAuthor[]> {
    const response = await supabase
        .from('comments')
        .select(`*, author ( * )`)
        .eq('post_id', postId)
        .order('created_at', { ascending: false })
        .abortSignal(abortController.signal);
    
    // TODO: Add error handling
    if (!response.success) throw response.error;
    
    return response.data;
}

async function create (
    { post_id: postId, text}: Comment.Create
): Promise<Comment.WithAuthor> {
    const response = await supabase
        .from('comments')
        .insert({ post_id: postId, text })
        .select(`*, author ( * )`);
    
    // TODO: Add error handling
    if (!response.success) throw response.error;

    const createdComment = response.data.at(0)!;
    return createdComment;
}

const commentService = {
    getAllByPostId,
    create
};

export default commentService;