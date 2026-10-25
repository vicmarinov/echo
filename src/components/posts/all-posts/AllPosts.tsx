import { useEffect, useState } from 'react';
import postService from '../../../services/post-service.ts';
import type { Post as PostTypes } from '../../../types/models.ts';
import Post from '../post/Post.tsx';
import styles from './AllPosts.module.css';

export default function AllPosts () {
    const [posts, setPosts] = useState<PostTypes.WithAuthor[]>();

    useEffect(() => {
        // TODO: Add real error handling

        const abortController = new AbortController();

        postService.getAll(abortController)
            .then(setPosts)
            .catch(() => console.error('SERVICE ERROR: Failed to fetch posts'));
        
        return () => abortController.abort();
    }, []);
    
    return (
        <main className={styles['all-posts']}>{
            posts === undefined
            ? (
                <p className={styles.message}>Loading posts...</p>
            )
            : posts.length === 0
            ? (
                <p className={styles.message}>There are no posts yet... <i className={styles.emoji}>😭</i></p>
            )
            : (
                <div className={styles.list}>
                    {posts.map(data => <Post key={data.id} {...data} />)}
                </div>
            ) 
        }</main>
    );
}