import type { Comment } from '../../../types/models.ts';
import Author from '../../author/Author.tsx';
import styles from './Comment.module.css';

export default function Comment (data: Comment.WithAuthor) {
    return (
        <article className={styles.comment}>
            <Author {...data.author} />
            <p className={styles.text}>{data.text}</p>
        </article>
    );
}