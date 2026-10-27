import useControlledForm from '../../../../hooks/use-controlled-form.ts';
import getEditPostSchema from './EditPost.schema.ts';
import formStyles from '../../../../styles/form.module.css';
import styles from '../SavePost.module.css';
import postService from '../../../../services/post-service.ts';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import type { Post } from '../../../../types/models.ts';

export default function EditPost () {
    console.log('aaaa');
    const { postId: id = '' } = useParams();

    const [initialData, setInitialData] = useState<Post.WithAuthor | null>();

    useEffect(() => {
        const abortController = new AbortController();

        postService.getById(id, abortController)
            .then(setInitialData)
            .catch((error) => {
                if (error.message.startsWith('AbortError')) {
                    console.log('Post fetch was aborted.');
                } else {
                    alert('Failed to fetch post. Please try again later.');
                    console.error('Post fetch error:', error);
                }
            });

        return () => abortController.abort();
    }, [id]);

    return (
        <main className={styles['save-post']}>{
            initialData === undefined
                ? <p className={styles.message}>Loading...</p>
            : initialData === null
                ? <p className={styles.message}>Post not found <i className={styles.emoji}>😭</i></p>
                : <EditPostForm initialData={initialData} />
        }</main>
    );
}

function EditPostForm ({ initialData }: { initialData : Post.WithAuthor }) {
    const navigate = useNavigate();

    const {
        formProps,
        fieldsProps,
        submitButtonProps,
        isSubmitting,
        errors
    } = useControlledForm(getEditPostSchema(initialData), async (data) => {
        try {
            const postId = initialData.id;
            await postService.edit(postId, data);
            navigate(`/posts/${postId}`);
        } catch (error) {
            alert('Failed to edit post. Please try again later.');
            console.error('Post edit error:', error);
        }
    });
    
    return (
        <form className={formStyles.form} {...formProps}>
            <h1 className={formStyles.heading}>Edit Post</h1>

            <div className={formStyles.field}>
                <label className={formStyles.label} htmlFor="text">Post Text</label>
                <textarea className={formStyles.input} id="text" {...fieldsProps.text}></textarea>
                {errors.text && <p className={formStyles['error-message']}>{errors.text.join(' ')}</p>}
            </div>

            <div className={formStyles.controls}>
                <button className={formStyles.submit} {...submitButtonProps}>
                    {isSubmitting ? 'Editing...' : 'Edit'}
                </button>
            </div>
        </form>
    );
}