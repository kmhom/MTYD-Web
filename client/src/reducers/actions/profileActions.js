import axios from 'axios';

import {
    FETCH_ORDER_HISTORY
} from './profileTypes';

import { API_URL } from '../constants'

export const fetchOrderHistory = () => dispatch => {
    // Change 100-000001 to other customers when log in implemented
    axios
        // .get(API_URL + 'meals_selected?customer_uid=100-000001')
        .get(API_URL + 'customer_lplp?customer_uid=100-000001')
        .then((res) => {
            console.log(res.data.result);
            dispatch({
                type: FETCH_ORDER_HISTORY,
                payload: res.data.result,
            })
        })
        .catch((error) => {
            console.log(error);
        })

}