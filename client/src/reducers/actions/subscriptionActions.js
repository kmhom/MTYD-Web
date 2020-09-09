import axios from 'axios';

import {
    FETCH_PLAN_INFO, CHOOSE_MEALS_EACH_DELIVERY, CHOOSE_PAYMENT_OPTION, GET_TOTAL_PAYMENT,
    CHANGE_ADDRESS_FIRST_NAME, CHANGE_ADDRESS_LAST_NAME, CHANGE_ADDRESS_STREET,
    CHANGE_ADDRESS_UNIT, CHANGE_ADDRESS_CITY, CHANGE_ADDRESS_STATE, CHANGE_ADDRESS_ZIP,
    CHANGE_ADDRESS_PHONE, CHANGE_DELIVERY_INSTRUCTIONS, SUBMIT_PAYMENT,
} from "../actions/subscriptionTypes";

import { API_URL } from '../constants'

export const fetchPlans = () => dispatch => {
    axios
        .get(API_URL+'plans',{
            params: {
                business_uid:'200-000001'
            }
        })
        .then((res) => {
            let items = res.data.result;
            let numItems = items.map((curValue) => curValue.num_items);
            let distinctNumItems = numItems.filter((elt,index) => numItems.indexOf(elt) === index);
            distinctNumItems.sort((a,b) => a-b);    
            let paymentFrequency = items.map((curValue) => curValue.payment_frequency);
            let distinctPaymentFrequency = paymentFrequency.filter((elt,index) => paymentFrequency.indexOf(elt) === index);
            distinctPaymentFrequency.sort((a,b) => a-b);
            dispatch({
                type: FETCH_PLAN_INFO,
                payload: {
                    'items': items,
                    'numItems': distinctNumItems,
                    'paymentFrequency': distinctPaymentFrequency,
                }
            })
        })
        .catch((error) => {
            console.log(error);
        })
}

export const chooseMealsDelivery = (newMeal, paymentOption,plans) => dispatch => {
    calculateTotalPayment(dispatch, plans,newMeal,paymentOption);
    dispatch({
        type: CHOOSE_MEALS_EACH_DELIVERY,
        payload: newMeal,
    })
}

export const choosePaymentOption = (newPaymentOption, meal,plans) => dispatch => {
    calculateTotalPayment(dispatch, plans,meal,newPaymentOption);
    dispatch({
        type: CHOOSE_PAYMENT_OPTION,
        payload: newPaymentOption,
    })
}

const calculateTotalPayment = (dispatch, plans,meal,options) => {
    if(meal !== '' && options !== '') {
        let mealNum = Number(meal);
        let optionsNum = Number(options);
        let selectedPlan = plans.filter((elt) => elt.num_items === mealNum && elt.payment_frequency === optionsNum)
        if(selectedPlan.length !== 0) {
            let totalPayment = selectedPlan[0].item_price;
            let totalPaymentStr = totalPayment.toString();
            dispatch({
                type: GET_TOTAL_PAYMENT,
                payload: totalPaymentStr,
            })
        } else {
            dispatch({
                type: GET_TOTAL_PAYMENT,
                payload: '',
            })
        }
    }
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

export const submitPayment = () => dispatch => {
    axios
        .post(API_URL+'checkout',{
            customer_uid: '100-000001',
            business_uid: '200-000001',
        })
        .then((res) => {
            console.log(res);
            dispatch({
                type: SUBMIT_PAYMENT,   
            })
        })
        .catch((err) => {
            console.log(err);
        })
}