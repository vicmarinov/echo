import { Navigate, Route, Routes } from 'react-router';
import AllPosts from './components/posts/all-posts/AllPosts.tsx';
import Header from './components/header/Header.tsx';
import Signup from './components/auth/signup/Signup.tsx';
import Login from './components/auth/login/Login.tsx';
import PostDetails from './components/posts/post-details/PostDetails.tsx';
import CreatePost from './components/posts/save-post/create-post/CreatePost.tsx';
import EditPost from './components/posts/save-post/edit-post/EditPost.tsx';
import { CurrentProfileProvider } from './contexts/current-profile-context.tsx';

export default function App () {
    return (
        <CurrentProfileProvider>
            <Header />
            
            <Routes>
                <Route path='/' element={<Navigate to='/posts' />} />

                {/* TODO: Implement the following route and its corresponding component */}
                <Route path='/about' element={<p>About: To be implemented...</p>} />
                <Route path='/:username' element={<p>Profile: To be implemented...</p>} />

                <Route path='/auth'>
                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<Signup />} />
                </Route>

                <Route path='/posts'>
                    <Route index element={<AllPosts />} />
                    <Route path=':postId' element={<PostDetails />} />
                    <Route path='create' element={<CreatePost />} />
                    <Route path=':postId/edit' element={<EditPost />} />
                </Route>
            </Routes>
        </CurrentProfileProvider>
    );
}