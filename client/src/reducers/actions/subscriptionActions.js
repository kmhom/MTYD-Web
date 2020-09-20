import axios from 'axios';

import {
    FETCH_PLAN_INFO, CHOOSE_MEALS_EACH_DELIVERY, CHOOSE_PAYMENT_OPTION, GET_TOTAL_PAYMENT,
    CHANGE_ADDRESS_FIRST_NAME, CHANGE_ADDRESS_LAST_NAME, CHANGE_ADDRESS_STREET,
    CHANGE_ADDRESS_UNIT, CHANGE_ADDRESS_CITY, CHANGE_ADDRESS_STATE, CHANGE_ADDRESS_ZIP,
    CHANGE_ADDRESS_PHONE, CHANGE_DELIVERY_INSTRUCTIONS, SUBMIT_PAYMENT,
} from "../actions/subscriptionTypes";

import { API_URL, BING_LCOATION_API_URL } from '../constants'

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
        .catch((err) => {
            console.log(err);
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
            let selectedItem = selectedPlan[0];
            dispatch({
                type: GET_TOTAL_PAYMENT,
                payload: selectedItem,
            })
        } else {
            dispatch({
                type: GET_TOTAL_PAYMENT,
                payload: {},
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

export const submitPayment = (
    customerUid, customerPassword, deliveryFirstName, deliveryLastName, deliveryPhone, 
    deliveryAddress, deliveryUnit, deliveryCity, deliveryState, deliveryZip,
    deliveryInstructions, selectedPlan, callback
) => dispatch => {
    // Will need to Re-login to retrieve hash, hard-coded currently
    //Location API to retrieve longitude, latitude
    axios 
    .get(BING_LCOATION_API_URL,{
        params: {
            CountryRegion: 'US',
            adminDistrict: deliveryState,
            locality: deliveryCity,
            postalCode: deliveryZip,
            addressLine: deliveryAddress,
            key: process.env.REACT_APP_BING_LOCATION_KEY,
        }
    })
    .then((res) => {
        let locationApiResult = res.data;
        if(locationApiResult.statusCode === 200) {
            let locations = locationApiResult.resourceSets[0].resources;
            /* Possible improvement: choose better location in case first one not desired
            */
            let location = locations[0];
            let lat = location.geocodePoints[0].coordinates[0];
            let long = location.geocodePoints[0].coordinates[1];
            if(location.geocodePoints.length === 2) {
                lat = location.geocodePoints[1].coordinates[0];
                long = location.geocodePoints[1].coordinates[1];
            }
            console.log(selectedPlan);
            let purchasedItem = [{
                'qty': '1',
                'name': selectedPlan.item_name,
                'price': selectedPlan.item_price,
                'item_uid': selectedPlan.item_uid,
            }]
            console.log(purchasedItem);
            let object = {
                customer_uid: '100-000082',
                salt: '64a7f1fb0df93d8f5b9df14077948afa1b75b4c5028d58326fb801d825c9cd24412f88c8b121c50ad5c62073c75d69f14557255da1a21e24b9183bc584efef71',
                business_id: '200-000001',
                delivery_first_name: deliveryFirstName,
                delivery_last_name: deliveryLastName,
                delivery_email: 'quang@gmail.com',
                delivery_phone: deliveryPhone,
                delivery_address: deliveryAddress,
                delivery_unit: deliveryUnit,
                delivery_city: deliveryCity,
                delivery_state: deliveryState,
                delivery_zip: deliveryZip,
                delivery_instructions: deliveryInstructions,
                delivery_longitude: long.toString(),
                delivery_latitude: lat.toString(),
                items: purchasedItem,
                amount_due: selectedPlan.item_price.toString(),
                amount_discount: '0',
                amount_paid: 0,
                cc_num: '4242424242424242',
                cc_exp_month: '04',
                cc_exp_year: '2024',
                cc_cvv: '424',
                cc_zip: '95120'
            }
            console.log(JSON.stringify(object));
            axios
                .post(API_URL+'checkout',object)
                .then((res) => {
                    console.log(res);
                    dispatch({
                        type: SUBMIT_PAYMENT,   
                    })
                    callback();
                })
                .catch((err) => {
                    console.log(err);
                    if(err.response) {
                        console.log(err.response);
                    }
                })
        }
    })
    .catch((err) => {
        console.log(err);
        if(err.response) {
            console.log(err.response);
        }
    })
}