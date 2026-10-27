import { Navigate, Route, Routes } from 'react-router';
import AllPosts from './components/posts/all-posts/AllPosts.tsx';
import Header from './components/header/Header.tsx';
import Signup from './components/auth/signup/Signup.tsx';
import Login from './components/auth/login/Login.tsx';
import PostDetails from './components/posts/post-details/PostDetails.tsx';
import CreatePost from './components/posts/save-post/create-post/CreatePost.tsx';
import EditPost from './components/posts/save-post/edit-post/EditPost.tsx';
import CurrentProfileProvider from './contexts/current-profile/current-profile-provider.tsx';
import ProtectedRoute from './components/protected-route/ProtectedRoute.tsx';
import Profile from './components/profile/Profile.tsx';
import About from './components/about/About.tsx';

export default function App () {
    return (
        <CurrentProfileProvider>
            <Header />
            
            <Routes>
                <Route path='/' element={<Navigate to='/posts' />} />
                <Route path='/about' element={<About />} />
                <Route path='/:username' element={<Profile />} />

                <Route path="/posts" element={<AllPosts />} />
                <Route path='/posts/:postId' element={<PostDetails />} />

                <Route element={<ProtectedRoute only='auth' />}>
                    <Route path='/posts/create' element={<CreatePost />} />
                    <Route path='/posts/:postId/edit' element={<EditPost />} />
                </Route>

                <Route element={<ProtectedRoute only='guest' />}>
                    <Route path='/auth/login' element={<Login />} />
                    <Route path='/auth/signup' element={<Signup />} />
                </Route>
            </Routes>
        </CurrentProfileProvider>
    );
}