import {
    FETCH_ORDER_HISTORY,
} from "./actions/profileTypes";


const initialState = {
    orderHistory: [],
}

export default function (state=initialState, action) {
    switch(action.type) {

        case FETCH_ORDER_HISTORY:
            return {
                ...state,
                orderHistory: action.payload
            }

        default:
            return state;
        
    }
}