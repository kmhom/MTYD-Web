// File for root reducer

import { combineReducers}  from 'redux';
import mtydReducer from './mtydReducer';

export default combineReducers({
    //reducers
    mtyd: mtydReducer,
});