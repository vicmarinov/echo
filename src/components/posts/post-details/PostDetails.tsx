import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import postService from '../../../services/post-service.ts';
import type { Post } from '../../../types/models.ts';
import Author from '../../author/Author.tsx';
import formatDateTime from '../../../utils/formatDateTime.ts';
import styles from './PostDetails.module.css';

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
                </section>
            </div>    
            )
        }</main>
    );
}