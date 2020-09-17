// File for root reducer

import { combineReducers}  from 'redux';
import loginReducer from './loginReducer';
import mtydReducer from './mtydReducer';
import subscriptionReducer from './subscriptionReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    //reducers
    mtyd: mtydReducer,
    login: loginReducer,
    subscribe: subscriptionReducer,
    profile: profileReducer,
});