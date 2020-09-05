// import axios from './axios';

import { CHOOSE_MEALS_EACH_DELIVERY, CHOOSE_PAYMENT_OPTION, CHANGE_PAYMENT_TOTAL,
    CHANGE_ADDRESS_FIRST_NAME, CHANGE_ADDRESS_LAST_NAME, CHANGE_ADDRESS_STREET,
    CHANGE_ADDRESS_UNIT, CHANGE_ADDRESS_CITY, CHANGE_ADDRESS_STATE, CHANGE_ADDRESS_ZIP,
    CHANGE_ADDRESS_PHONE, CHANGE_DELIVERY_INSTRUCTIONS,
} from "../actions/subscriptionTypes";

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

export const changeAddressFirstName = (newFirstName) => dispatch => {
    dispatch({
        type: CHANGE_ADDRESS_FIRST_NAME,
        payload: newFirstName,
    })
}

export const changeAddressLastName = (newLastName) => dispatch => {
    dispatch({
        type: CHANGE_ADDRESS_LAST_NAME,
        payload: newLastName,
    })
}

export const changeAddressStreet = (newStreet) => dispatch => {
    dispatch({
        type: CHANGE_ADDRESS_STREET,
        payload: newStreet,
    })
}

export const changeAddressUnit = (newUnit) => dispatch => {
    dispatch({
        type: CHANGE_ADDRESS_UNIT,
        payload: newUnit,
    })
}

export const changeAddressCity = (newCity) => dispatch => {
    dispatch({
        type: CHANGE_ADDRESS_CITY,
        payload: newCity,
    })
}

export const changeAddressState = (newState) => dispatch => {
    dispatch({
        type: CHANGE_ADDRESS_STATE,
        payload: newState,
    })
}

export const changeAddressZip = (newZip) => dispatch => {
    dispatch({
        type: CHANGE_ADDRESS_ZIP,
        payload: newZip,
    })
}

export const changeAddressPhone = (newPhoneNum) => dispatch => {
    dispatch({
        type: CHANGE_ADDRESS_PHONE,
        payload: newPhoneNum,
    })
}

export const changeDeliveryInstructions = (newInstructions) => dispatch => {
    dispatch({
        type: CHANGE_DELIVERY_INSTRUCTIONS,
        payload: newInstructions,
    })
}