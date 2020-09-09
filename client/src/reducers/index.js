// File for root reducer

import { combineReducers}  from 'redux';
import mtydReducer from './mtydReducer';
import subscriptionReducer from './subscriptionReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    //reducers
    mtyd: mtydReducer,
    subscribe: subscriptionReducer,
    profile: profileReducer,
});