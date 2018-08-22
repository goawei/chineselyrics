import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import { songInputReducer } from './songInputReducer';

const reducers = combineReducers({
    songInputReducer
});

const store = createStore(reducers, {}, applyMiddleware(thunk));

export default store;