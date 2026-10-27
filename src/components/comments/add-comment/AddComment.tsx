import { useNavigate, useParams } from 'react-router';
import useControlledForm from '../../../hooks/use-controlled-form.ts';
import addCommentSchema from './AddComment.schema.ts';
import commentService from '../../../services/comment-service.ts';
import styles from './AddComment.module.css';
import useCurrentProfile from '../../../contexts/current-profile/use-current-profile.ts';
import useComments from '../../../contexts/comments/use-comments.ts';

export default function AddComment () {
    const { postId = '' } = useParams();
    const { dispatch } = useComments();
    const navigate = useNavigate();

    const {
        formProps,
        fieldsProps,
        submitButtonProps,
        isSubmitting,
        errors
    } = useControlledForm(addCommentSchema, async (data) => {
        const addedComment = await commentService
            .create({ post_id: postId, text: data.text });
        
        dispatch({ type: 'ADD_COMMENT', payload: addedComment });
        navigate(`/posts/${postId}`);
    });

    const { profile } = useCurrentProfile();
    const isAuth = !!profile;
    if (!isAuth) return;
    
    return (
        <form className={styles['add-comment-form']} {...formProps}>
            <div className={styles['input-container']}>
                <input className={styles.input} {...fieldsProps.text} />
                <button className={styles.submit} {...submitButtonProps}>
                    {isSubmitting ? 'Adding...' : 'Add'}
                </button>
            </div>
            {errors.text && <p className={styles['error-message']}>{errors.text.join(' ')}</p>}
        </form>
    );
}