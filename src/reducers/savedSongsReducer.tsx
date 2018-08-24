interface ISavedSong {
    title: string;
    lyrics: any;
}

export const savedSongReducer = (state: ISavedSong[] = [], action: { type: string, savedSong: ISavedSong, savedSongs: ISavedSong[] }) => {
    switch (action.type) {
        case 'SAVE_SONG':
            return state.concat(action.savedSong);
        case 'DELETE_SONG':
            return state.filter((song) => song.title !== action.savedSong.title);
        case 'LOAD_SONGS':
            return state.concat(action.savedSongs);
        default:
            return state;
    }
};