import { useEffect, useState } from 'react';
import postService from '../../services/post-service.ts';
import type { PostData } from '../../types/models.ts';
import Post from '../post/Post.tsx';
import styles from './AllPosts.module.css';

export default function AllPosts () {
    const [posts, setPosts] = useState<PostData[]>([]);

    useEffect(() => {
        // TODO: Add error handling
        // TODO: Add AbortController
        postService.getAll()
            .then(data => data && setPosts(data));
    }, []);
    
    return (
        <main className={styles['all-posts']}>
            <h1>All Posts</h1>
            {posts.length
                ? (
                    <div className={styles.list}>
                        {posts.map(data => <Post key={data.id} {...data} />)}
                    </div>
                )
                : <p className={styles['no-posts']}>There are no posts yet... <i className={styles.emoji}>😭</i></p>
            }
        </main>
    );
}