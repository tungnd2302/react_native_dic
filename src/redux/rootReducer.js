
import { combineReducers } from 'redux';
import CommonsReducer from './commons/reducer';

export const rootReducer = combineReducers({
    commons : CommonsReducer
})
