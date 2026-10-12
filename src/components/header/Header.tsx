import styles from './Header.module.css';

export default function Header () {
    return (
        <header className={styles.header}>
            {/* TODO: Update the hypertext reference of the anchor tag */}
            <a href="#">
                <img src="/logo.svg" alt="Logo" className={styles.logo} />
            </a>
            <nav className={styles.navigation}>
                <ol className={styles.list}>
                    {/* TODO: Update the hypertext references of the anchor tags */}
                    <li><a href="#" className={styles.link}>Posts</a></li>
                    <li><a href="#" className={styles.link}>About</a></li>
                    <li><a href="#" className={styles.link}>Log in</a></li>
                    <li><a href="#" className={styles.link}>Sign up</a></li>
                </ol>
            </nav>
        </header>
    );
}