import styles from './About.module.css'

export default function About () {
    return (
        <main className={styles.about}>
            <div className={styles.container}>
                <h1>About</h1>
                <p>Echo is a clean, distraction-free microblogging platform designed for meaningful conversations and quick idea sharing. Stripping away the clutter of traditional social networks, Echo focuses on what matters most: your voice and the community's response.</p>
                <p>This application was developed as an educational project to demonstrate modern web development practices. It serves as a practical showcase of building a robust, strictly typed Single-Page Application (SPA) with a focus on scalable component architecture, custom form handling, and clean state management.</p>

                <h2>Core Features</h2>
                <ul>
                    <li>
                        <p><strong>Publish & Manage Posts:</strong> Share your updates, thoughts, and stories with the community, with full control to edit or remove your content at any time.</p>
                    </li>
                    <li>
                        <p><strong>Community Interaction:</strong> Integrated comment sections under each post to foster active discussions.</p>
                    </li>
                    <li>
                        <p><strong>Personalize Your Identity:</strong> Maintain your personal profile and explore posts and contributions from other authors across the platform.</p>
                    </li>
                    <li>
                        <p><strong>Secure Access:</strong> Enjoy a seamless and protected experience with dedicated authentication and route guarding.</p>
                    </li>
                </ul>
            </div>
        </main>
    );
}