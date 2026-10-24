import { Navigate, Route, Routes } from 'react-router';
import AllPosts from './components/posts/all-posts/AllPosts.tsx';
import Header from './components/header/Header.tsx';
import Signup from './components/auth/signup/Signup.tsx';
import Login from './components/auth/login/Login.tsx';

export default function App () {
    return (
        <>
            <Header />
            
            <Routes>
                <Route path='/' element={<Navigate to='/posts' />} />
                <Route path='/posts' element={<AllPosts />} />
                
                {/* TODO: Implement the following routes and their corresponding components */}
                <Route path='/about' element={<p>About: To be implemented...</p>} />

                <Route path='/auth'>
                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<Signup />} />
                </Route>
            </Routes>
        </>
    );
}