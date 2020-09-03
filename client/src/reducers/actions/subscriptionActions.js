// import axios from './axios';

import { CHOOSE_PLAN_DAY, CHOOSE_MEALS_EACH_DELIVERY, CHOOSE_PAYMENT_OPTION,
CHANGE_PAYMENT_TOTAL, } from './subscriptionTypes';

export const chooseDay = (day) => dispatch => {
    dispatch({
        type: CHOOSE_PLAN_DAY,
        payload: day,
    })
}

export const chooseMealsDelivery = (num) => dispatch => {
    dispatch({
        type: CHOOSE_MEALS_EACH_DELIVERY,
        payload: num,
    })
}

export const choosePaymentOption = (opt) => dispatch => {
    dispatch({
        type: CHOOSE_PAYMENT_OPTION,
        payload: opt,
    })
}

export const changeTotalPayment = (newPayment) => dispatch => {
    dispatch({
        type: CHANGE_PAYMENT_TOTAL,
        payload: newPayment,
    })
}