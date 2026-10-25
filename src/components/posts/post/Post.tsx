import { useNavigate } from 'react-router';
import type { Post } from '../../../types/models.ts';
import styles from './Post.module.css';

export default function Post (data: Post.Data) {
    const navigate = useNavigate();

    const clickHandler = () => navigate(`/posts/${data.id}`);

    return (
        <article className={styles.post} onClick={clickHandler}>{data.text}</article>
    );
}