import type { Post } from '../../../types/models.ts';
import styles from './Post.module.css';

export default function Post (data: Post.Data) {
    return (
        <article className={styles.post}>{data.text}</article>
    );
}