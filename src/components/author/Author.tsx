import { Link } from 'react-router';
import type { Profile } from '../../types/models.ts';
import styles from './Author.module.css';

export default function Author (data: Profile.Data) {
    return (
        <Link to={`/${data.username}`} className={styles.author}>
            <span className={styles.name}>{data.name}</span>
            <span className={styles.username}>{`@${data.username}`}</span>
        </Link>
    );
}