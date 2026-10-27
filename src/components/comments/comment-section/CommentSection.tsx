import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import commentService from '../../../services/comment-service.ts';
import type { Comment as CommentType } from '../../../types/models.ts';
import AddComment from '../add-comment/AddComment.tsx';
import Comment from '../comment/Comment.tsx';
import styles from './CommentSection.module.css';
import useCurrentProfile from '../../../contexts/current-profile/use-current-profile.ts';

export default function CommentSection () {
    const { postId = '' } = useParams();
    
    const [comments, setComments] = useState<CommentType.WithAuthor[]>();

    useEffect(() => {
        // TODO: Add error handling

        const abortController = new AbortController();

        commentService
            .getAllByPostId(postId, abortController)
            .then(setComments)
            .catch(() => console.error('SERVICE ERROR: Failed to fetch comments'))
        
        return () => abortController.abort();
    }, [postId]);

    const { profile } = useCurrentProfile();
    const isAuth = !!profile;

    return (
        <section className={styles['comment-section']}>
            <h2 className={styles.heading}>Comments</h2>

            <AddComment />

            {
                comments === undefined
                ? (
                    <p className={styles.message}>Loading...</p>
                )
                : comments.length === 0
                ? (
                    <div>
                        <p className={styles.message}>No comments yet.</p>
                        {isAuth && <p className={styles.message}>Be the first to comment!</p>}
                    </div>
                )
                : (
                    <div className={styles['comments-list']}>
                        {comments.map(data => <Comment key={data.id} {...data} />)}
                    </div>
                )
            }
        </section>
    );
}