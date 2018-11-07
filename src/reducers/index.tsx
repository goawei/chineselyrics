import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import { songInputReducer } from './songInputReducer';
import { savedSongReducer } from './savedSongsReducer';
import { pinyinReducer } from './settings';

const reducers = combineReducers({
    pinyinReducer,
    songInputReducer,
    savedSongReducer
});

const store = createStore(reducers, {}, applyMiddleware(thunk));

export default store;