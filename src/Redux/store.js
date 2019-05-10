import {createStore, applyMiddleWare, combineReducers} from 'redux';
import promise from 'redux-promise-middleware';

import userReducer from './Ducks/userReducer';
import studentReducer from './Ducks/studentReducer';

// Root Reducer
const rootReducer = combineReducers({
    user: userReducer,
    students: studentReducer
});

// STORE 
const middleware = applyMiddleWare(promise);
export default createStore(rootReducer, middleware)


