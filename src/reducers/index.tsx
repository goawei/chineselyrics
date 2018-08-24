import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import { songInputReducer } from './songInputReducer';
import { savedSongReducer } from './savedSongsReducer';

const reducers = combineReducers({
    songInputReducer,
    savedSongReducer
});

const store = createStore(reducers, {}, applyMiddleware(thunk));

export default store;