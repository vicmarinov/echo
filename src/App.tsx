import { Navigate, Route, Routes } from 'react-router';
import AllPosts from './components/all-posts/AllPosts.tsx';
import Header from './components/header/Header.tsx';

export default function App () {
    return (
        <>
            <Header />
            
            <Routes>
                <Route path='/' element={<Navigate to='/posts' />} />
                <Route path='/posts' element={<AllPosts />} />
                
                {/* TODO: Implement the following routes and their corresponding components */}
                <Route path='/about' element={<p>About: To be implemented...</p>} />
                <Route path='/login' element={<p>Log In: To be implemented...</p>} />
                <Route path='/signup' element={<p>Sign Up: To be implemented...</p>} />
            </Routes>
        </>
    );
}