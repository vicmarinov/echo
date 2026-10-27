import { useMemo, useReducer, type ReactNode } from 'react';
import CommentsContext from './comments-context.ts';
import commentsReducer from './comments-reducer.ts';

export default function CommentsProvider (
    { children }: { children: ReactNode; }
) {
    const [comments, dispatch] = useReducer(commentsReducer, undefined);
    const contextValue = useMemo(() => ({ comments, dispatch }), [comments]);

    return (
        <CommentsContext.Provider value={contextValue}>
            {children}
        </CommentsContext.Provider>
    );
}