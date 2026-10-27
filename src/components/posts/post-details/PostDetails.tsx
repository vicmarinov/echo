import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router';
import postService from '../../../services/post-service.ts';
import type { Post } from '../../../types/models.ts';
import Author from '../../author/Author.tsx';
import formatDateTime from '../../../utils/format-date-time.ts';
import styles from './PostDetails.module.css';
import CommentSection from '../../comments/comment-section/CommentSection.tsx';
import useCurrentProfile from '../../../contexts/current-profile/use-current-profile.ts';
import CommentsProvider from '../../../contexts/comments/comments-provider.tsx';

export default function PostDetails () {
    const { postId: id = '' } = useParams();
    
    const [data, setData] = useState<Post.WithAuthor | null>();

    useEffect(() => {
        // TODO: Add error handling

        const abortController = new AbortController();

        postService.getById(id, abortController)
            .then(setData)
            .catch(() => console.error('SERVICE ERROR: Failed to fetch post'));
        
        return () => abortController.abort();
    }, [id]);
    
    const { profile } = useCurrentProfile();
    const isAuth = !!profile;
    const isOwner = isAuth && data?.author.username === profile.username;

    const navigate = useNavigate();

    const deleteHandler = async () => {
        if (!isOwner) {
            return <Navigate to={`/posts/${id}`} />;
        }

        const isConfirmed = confirm('Are you sure you want to delete this post?');
        if (!isConfirmed) return;
        
        await postService.remove(id);
        navigate('/');
    }

    return (
        <main className={styles['post-details']}>{
            data === undefined
            ? (
                <p className={styles.message}>Loading...</p>
            )
            : data === null
            ? (
                <p className={styles.message}>Post not found <i className={styles.emoji}>😭</i></p>
            )
            : (
            <div className={styles.container}>
                <section className={styles.text}>{
                    data?.text.split('\n')
                        .map((row, index) => <p key={index + 1}>{row}</p>)
                }</section>
                
                <section className={styles.details}>    
                    <section className={styles.info}>
                        <Author {...data.author} />
                        <p>
                            <time dateTime={data.created_at}>{formatDateTime(data.created_at)}</time>
                        </p>
                    </section>
                    
                    {isOwner && (    
                        <section className={styles.controls}>
                            <Link to={`/posts/${id}/edit`} className={styles['edit-button']}>Edit</Link>
                            <button onClick={deleteHandler} className={styles['delete-button']}>Delete</button>
                        </section>
                    )}
                    
                    <CommentsProvider>
                        <CommentSection/>
                    </CommentsProvider>
                </section>
            </div>    
            )
        }</main>
    );
}