import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Profile } from '../../types/models.ts';
import authService from '../../services/auth-service.ts';
import CurrentProfileContext from './current-profile-context.ts';

export default function CurrentProfileProvider (
    { children }: { children: ReactNode; }
) {
    const [currentProfile, setCurrentProfile] = useState<Profile.Data | null>(null);

    useEffect(() => {
        refreshProfile();
    }, []);

    const refreshProfile = useCallback(async () => {
        try {
            const profile = await authService.getCurrentUserProfile();
            setCurrentProfile(profile);
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        }
    }, []);

    const contextValue = useMemo(() => ({
        profile: currentProfile,
        refreshProfile
    }), [currentProfile]);

    return (
        <CurrentProfileContext.Provider value={contextValue}>
            {children}
        </CurrentProfileContext.Provider>
    );
}