import { Dispatch } from 'redux';

export const togglePinyin = () => {
    return (dispatch: Dispatch<Object>) => {
        dispatch({
            type: 'TOGGLE_PINYIN'
        });
    };
};