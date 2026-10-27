import type { Comment } from '../../types/models.ts';

export type CommentsReducerAction =
    | { type: 'SET_COMMENTS', payload: Comment.WithAuthor[]; }
    | { type: 'ADD_COMMENT', payload: Comment.WithAuthor; };

export default function commentsReducer (
    state: Comment.WithAuthor[] | undefined,
    action: CommentsReducerAction
): Comment.WithAuthor[] | undefined {
    const { type, payload } = action;

    switch (type) {
        case 'SET_COMMENTS':
            return payload;

        case 'ADD_COMMENT':
            return [...(state ?? []), payload];

        default:
            return state;
    }
}