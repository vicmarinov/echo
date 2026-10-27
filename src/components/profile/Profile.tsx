import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { Profile } from '../../types/models.ts';
import authService from '../../services/auth-service.ts';
import Post from '../posts/post/Post.tsx';
import styles from './Profile.module.css'

export default function Profile () {
    const { username = '' } = useParams();
    const [profile, setProfile] = useState<Profile.WithPosts | null>();

    useEffect(() => {
        const abortController = new AbortController();

        authService
            .getUserProfileByUsername(username, abortController)
            .then(setProfile)
            .catch((error) => {
                if (error.message.startsWith('AbortError')) {
                    console.log('Profile fetch was aborted.');
                } else {
                    alert('Failed to fetch profile. Please try again later.');
                    console.error('Profile fetch error:', error);
                }
            });
        
        return () => abortController.abort();
    }, [username]);

    return (
        <main className={styles.profile}>{
            profile === undefined
            ? (
                <p className={styles.message}>Loading profile...</p>
            )
            : profile === null
            ? (
                <p className={styles.message}>Profile not found <i className={styles.emoji}>😭</i></p>
            )
            : (
                <>
                    <header className={styles.info}>
                        <h1 className={styles.name}>{profile.name} <span className={styles.username}>@{profile.username}</span></h1>
                    </header>
                    
                    <section className={styles['posts-list']}>{
                        profile.posts.map(postData => <Post key={postData.id} {...postData} />)
                    }</section>
                </>
            )
        }</main>
    );
}