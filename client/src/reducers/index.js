// File for root reducer

import { combineReducers}  from 'redux';
import loginReducer from './loginReducer';
import subscriptionReducer from './subscriptionReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    //reducers
    login: loginReducer,
    subscribe: subscriptionReducer,
    profile: profileReducer,
});