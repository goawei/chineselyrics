import { Dispatch } from 'redux';

interface ISavedSong {
    title: string;
    lyrics: any;
}

export const saveSong = (savedSong: ISavedSong) => {
    return (dispatch: Dispatch<Object>) => {
        dispatch({
            type: 'SAVE_SONG',
            savedSong
        });
    };
};

export const deleteSong = (savedSong: ISavedSong) => {
    return (dispatch: Dispatch<Object>) => {
        dispatch({
            type: 'DELETE_SONG',
            savedSong
        });
    };
};

export const loadSongs = (savedSongs: ISavedSong[]) => {
    return (dispatch: Dispatch<Object>) => {
        dispatch({
            type: 'LOAD_SONGS',
            savedSongs
        });
    };
};