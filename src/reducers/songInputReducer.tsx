export const songInputReducer = (state = '', action: { type: string, input: string }) => {
    switch (action.type) {
        case 'UPDATE_SONG_INPUT':
        case 'CLEAR_SONG_INPUT':
            return action.input;
        default:
            return state;
    }
};