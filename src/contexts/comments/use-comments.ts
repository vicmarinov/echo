import { useContext } from 'react';
import CommentsContext from './comments-context.ts';

export default function useComments () {
    const context = useContext(CommentsContext);

    if (!context) {
        throw new Error('`useComments` must be used within a `CommentsProvider`');
    }

    return context;
}