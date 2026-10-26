import supabase from '../lib/supabase.ts';
import type { Comment } from '../types/models.ts';

async function create (
    { post_id: postId, text}: Comment.Create
): Promise<string> {
    const response = await supabase
        .from('comments')
        .insert({ post_id: postId, text })
        .select();
    
    // TODO: Add error handling
    if (!response.success) throw response.error;

    const createdComment = response.data.at(0) as Comment.Data;
    return createdComment.id;
}

const commentService = {
    create
};

export default commentService;