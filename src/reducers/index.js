import { combineReducers } from 'redux';
import auth from './auth';
import todo from './todo';
import errors from './errors';
import messages from './messages';

export default combineReducers({
    auth,
    todo,
    errors,
    messages
});