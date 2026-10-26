import { Link, NavLink } from 'react-router';
import useCurrentProfile from '../../hooks/use-current-profile.ts';
import authService from '../../services/auth-service.ts';
import styles from './Header.module.css';

export default function Header () {
    const { refreshProfile } = useCurrentProfile();

    const logoutHandler = async () => {
        await authService.logOut();
        await refreshProfile();
    }

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
                    <li><button onClick={logoutHandler} className={styles.link}>Logout</button></li>
                </ol>
            </nav>
        </header>
    );
}