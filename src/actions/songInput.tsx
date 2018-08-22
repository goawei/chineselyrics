import { Dispatch } from 'redux';

export const updateSongInput = (input: string) => {
    return (dispatch: Dispatch<Object>) => {
        dispatch({
            type: 'UPDATE_SONG_INPUT',
            input
        });
    };
};

export const clearSongInput = (input: string) => {
    return (dispatch: Dispatch<Object>) => {
        dispatch({
            type: 'CLEAR_SONG_INPUT',
            input
        });
    };
};