import axios from 'axios';

import {
    LOGOUT_PROFILE, FETCH_ORDER_HISTORY
} from './profileTypes';

import { API_URL } from '../constants'

export const resetProfile = () => dispatch => {
    dispatch({
        type: LOGOUT_PROFILE,
    })
}

export const fetchOrderHistory = (customer_uid) => dispatch => {
    // Change 100-000001 to other customers when log in implemented
    axios
        // .get(API_URL + 'meals_selected?customer_uid=100-000001')
        .get(API_URL + 'customer_lplp',{
            params: {
                customer_uid: customer_uid,
            }
        })
        .then((res) => {
            console.log(res.data.result);
            dispatch({
                type: FETCH_ORDER_HISTORY,
                payload: res.data.result,
            })
        })
        .catch((err) => {
            console.log(err);
        })

}