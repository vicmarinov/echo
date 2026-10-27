import { createContext } from 'react';
import type { Comment } from '../../types/models.ts';
import type { CommentsReducerAction } from './comments-reducer.ts';

type CommentsContextType = {
    comments: Comment.WithAuthor[] | undefined;
    dispatch: (action: CommentsReducerAction) => void;
};

const CommentsContext = createContext<CommentsContextType | undefined>(undefined);

export default CommentsContext;