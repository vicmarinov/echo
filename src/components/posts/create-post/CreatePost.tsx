import useControlledForm from '../../../hooks/use-controlled-form.ts';
import createPostSchema from './CreatePost.schema.ts';
import formStyles from '../../../styles/form.module.css';
import styles from './CreatePost.module.css';
import postService from '../../../services/post-service.ts';
import { useNavigate } from 'react-router';

export default function CreatePost () {
    const navigate = useNavigate();

    const {
        formProps,
        fieldsProps,
        submitButtonProps,
        isSubmitting,
        errors
    } = useControlledForm(createPostSchema, async (data) => {
        const createdPostId: string = await postService
            .create(data, new AbortController());
        
        navigate(`/posts/${createdPostId}`);
    });
    
    return (
        <main className={styles['create-post']}>
            <form className={formStyles.form} {...formProps}>
                <h1 className={formStyles.heading}>Create Post</h1>

                <div className={formStyles.field}>
                    <label className={formStyles.label} htmlFor="text">Post Text</label>
                    <textarea className={formStyles.input} id="text" {...fieldsProps.text}></textarea>
                    {errors.text && <p className={formStyles['error-message']}>{errors.text.join(' ')}</p>}
                </div>

                <div className={formStyles.controls}>
                    <button className={formStyles.submit} {...submitButtonProps}>
                        {isSubmitting ? 'Creating...' : 'Create'}
                    </button>
                </div>
            </form>
        </main>
    );
}