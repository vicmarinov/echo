import type { PostData } from '../../types/models.ts';
import styles from './Post.module.css';

export default function Post (data: PostData) {
    return (
        <article className={styles.post}>{data.text}</article>
    );
}