import authentication from './authentication';
import posts from './posts'
import { combineReducers } from 'redux';

export default combineReducers({
    authentication,
    posts
});