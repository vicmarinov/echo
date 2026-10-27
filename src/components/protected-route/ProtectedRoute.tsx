import { Navigate, Outlet } from 'react-router';
import useCurrentProfile from '../../contexts/current-profile/use-current-profile.ts';

export default function ProtectedRoute (
    { only }: { only: 'auth' | 'guest' }
) {
    const { profile } = useCurrentProfile();
    const isAuth = !!profile;

    if (only === 'auth' && !isAuth) {
        return <Navigate to={'/auth/login'} />;
    }

    if (only === 'guest' && isAuth) {
        return <Navigate to={'/'} />;
    }

    return (
        <Outlet />
    );
}