import { useNavigate } from 'react-router';
import type { Post } from '../../../types/models.ts';
import Author from '../../author/Author.tsx';
import styles from './Post.module.css';

export default function Post (data: Post.WithAuthor) {
    const navigate = useNavigate();

    const clickHandler = () => navigate(`/posts/${data.id}`);

    return (
        <article className={styles.post} onClick={clickHandler}>
            <Author {...data.author} />
                
            {
                ...data.text.split('\n')
                    .map((row, index) => <p key={index + 1}>{row}</p>)
            }
        </article>
    );
}