import { useContext } from 'react';
import CurrentProfileContext from './current-profile-context.ts';

export default function useCurrentProfile () {
    const context = useContext(CurrentProfileContext);

    if (!context) {
        throw new Error('`useCurrentProfile` must be used within a `CurrentProfileProvider`');
    }

    return context;
}