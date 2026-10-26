import { useNavigate, useParams } from 'react-router';
import useControlledForm from '../../../hooks/use-controlled-form.ts';
import addCommentSchema from './AddComment.schema.ts';
import commentService from '../../../services/comment-service.ts';
import styles from './AddComment.module.css';

export default function AddComment () {
    const { postId = '' } = useParams();
    const navigate = useNavigate();

    const {
        formProps,
        fieldsProps,
        submitButtonProps,
        errors
    } = useControlledForm(addCommentSchema, async (data) => {
        await commentService.create({ post_id: postId, text: data.text });
        navigate(`/posts/${postId}`);
    });
    
    return (
        <form className={styles['add-comment-form']} {...formProps}>
            <div className={styles['input-container']}>
                <input className={styles.input} {...fieldsProps.text} />
                <button className={styles.submit} {...submitButtonProps}>Add</button>
            </div>
            {errors.text && <p className={styles['error-message']}>{errors.text.join(' ')}</p>}
        </form>
    );
}