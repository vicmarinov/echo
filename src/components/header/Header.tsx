import { Link, NavLink } from 'react-router';
import useCurrentProfile from '../../contexts/current-profile/use-current-profile.ts';
import authService from '../../services/auth-service.ts';
import styles from './Header.module.css';

export default function Header () {
    const { profile, refreshProfile } = useCurrentProfile();
    const isAuth = !!profile;

    const logoutHandler = async () => {
        try {
            await authService.logOut();
            await refreshProfile();
        } catch (error) {
            alert('Logout failed. Please try again.');
            console.error('Logout error:', error);
        }
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
                    <li><NavLink to="/about" className={navLinkClassName}>About</NavLink></li>

                    {
                        isAuth
                        ? <>
                            <li><NavLink to="/posts/create" className={navLinkClassName}>Create</NavLink></li>
                            <li><NavLink to={`/${profile.username}`} className={navLinkClassName}>Profile</NavLink></li>
                            <li><button onClick={logoutHandler} className={styles.link}>Logout</button></li>
                        </>
                        : <>
                            <li><NavLink to="/auth/login" className={navLinkClassName}>Log in</NavLink></li>
                            <li><NavLink to="/auth/signup" className={navLinkClassName}>Sign up</NavLink></li>
                        </>
                    }
                </ol>
            </nav>
        </header>
    );
}