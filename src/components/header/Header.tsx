import { Link, NavLink } from 'react-router';
import styles from './Header.module.css';

export default function Header () {
    const navLinkClassName = ({ isActive }: { isActive: boolean }): string => {
        return [
            styles.link,
            isActive ? styles.active : ''
        ].join(' ').trim();
    }
    
    return (
        <header className={styles.header}>
            <Link to='/'>
                <img src="/logo.svg" alt="Logo" className={styles.logo} />
            </Link>
            <nav className={styles.navigation}>
                <ol className={styles.list}>
                    <li><NavLink to="/posts" className={navLinkClassName}>Posts</NavLink></li>
                    <li><NavLink to="/posts/create" className={navLinkClassName}>Create</NavLink></li>
                    <li><NavLink to="/about" className={navLinkClassName}>About</NavLink></li>
                    <li><NavLink to="/auth/login" className={navLinkClassName}>Log in</NavLink></li>
                    <li><NavLink to="/auth/signup" className={navLinkClassName}>Sign up</NavLink></li>
                </ol>
            </nav>
        </header>
    );
}