import { useEffect } from 'react';
import { useParams } from 'react-router';
import commentService from '../../../services/comment-service.ts';
import AddComment from '../add-comment/AddComment.tsx';
import Comment from '../comment/Comment.tsx';
import useCurrentProfile from '../../../contexts/current-profile/use-current-profile.ts';
import useComments from '../../../contexts/comments/use-comments.ts';
import styles from './CommentSection.module.css';

export default function CommentSection () {
    const { postId = '' } = useParams();

    const { comments, dispatch } = useComments();

    useEffect(() => {
        const abortController = new AbortController();

        commentService
            .getAllByPostId(postId, abortController)
            .then(comments => dispatch({
                type: 'SET_COMMENTS',
                payload: comments
            }))
            .catch((error) => {
                alert('Failed to fetch comments. Please try again later.');
                console.error('Comments fetch error:', error);
            })
        
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