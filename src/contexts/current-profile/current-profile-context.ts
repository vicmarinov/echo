import { createContext } from 'react';
import type { Profile } from '../../types/models.ts';

type CurrentProfileContextType = {
    profile: Profile.Data | null;
    refreshProfile: () => Promise<void>;
};

const CurrentProfileContext = createContext<CurrentProfileContextType | undefined>(undefined);

export default CurrentProfileContext;