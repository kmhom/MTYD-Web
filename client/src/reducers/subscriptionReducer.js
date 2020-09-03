import { CHOOSE_PLAN_DAY, CHOOSE_MEALS_EACH_DELIVERY, CHOOSE_PAYMENT_OPTION,
CHANGE_PAYMENT_TOTAL, } from "./actions/subscriptionTypes";


const initialState = {
    day: '',
    meals: NaN,
    paymentOption: '',
    paymentTotal: '',
};

export default function(state = initialState, action) {
    switch(action.type) {
        case CHOOSE_PLAN_DAY:
            return {
                ...state,
                day: action.payload,
            }

        case CHOOSE_MEALS_EACH_DELIVERY:
            return {
                ...state,
                meals: action.payload,
            }

        case CHOOSE_PAYMENT_OPTION:
            return {
                ...state,
                paymentOption: action.payload,
            }

        case CHANGE_PAYMENT_TOTAL:
            return {
                ...state,
                paymentTotal: action.payload,
            }

        default:
            return state;
    }
}