import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Profile } from '../types/models.ts';
import authService from '../services/auth-service.ts';

type CurrentProfile = Profile.Data | null;
type CurrentProfileContextType = {
    profile: CurrentProfile;
    refreshProfile: () => Promise<void>;
};

export const CurrentProfileContext = createContext<CurrentProfileContextType | undefined>(undefined);

export function CurrentProfileProvider (
    { children }: { children: ReactNode }
) {
    const [currentProfile, setCurrentProfile] = useState<CurrentProfile>(null);

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

export default CurrentProfileContext;