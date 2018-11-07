export const pinyinReducer = (state: boolean = true, action: { type: string }) => {
    switch (action.type) {
        case 'TOGGLE_PINYIN':
            return !state;
        default:
            return state;
    }
};