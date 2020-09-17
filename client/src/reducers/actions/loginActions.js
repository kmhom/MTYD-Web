import axios from 'axios';

import {
    CHANGE_EMAIL, CHANGE_PASSWORD
} from './loginTypes'

import { API_URL } from '../constants'

export const changeEmail = (newEmail) => dispatch => {
    dispatch({
        type: CHANGE_EMAIL,
        payload: newEmail,
    })
}

export const changePassword = (newPassword) => dispatch => {
    dispatch({
        type: CHANGE_PASSWORD,
        payload: newPassword,
    })
}

export const loginAttempt = (email, password, callback) => dispatch => {
    // Get salt for account
    axios
    .get(API_URL+'accountsalt',{
        params: {
            email: email,
        }
    })
    .then((res) => {
        console.log("account salt api", res.status, res)
        let saltObject = res;
        if(saltObject.status === 200) {
            let hashAlg = saltObject.data.result[0].password_algorithm;
            let salt = saltObject.data.result[0].password_salt;
            if(hashAlg !== '' && salt !== '')  {
                //Get hash algorithm
                switch(hashAlg) {
                    case 'SHA512':
                        hashAlg = 'SHA-512';
                        break;

                    default:
                        break;
                }
                console.log(hashAlg,salt);
                let saltedPassword = password + salt;
                console.log(saltedPassword);
                // Encode salted password to prepare for hashing
                const encoder = new TextEncoder();
                const data = encoder.encode(saltedPassword);
                // Hash salted password
                crypto.subtle.digest(hashAlg,data)
                .then((res) => {
                    let hash = res;
                    // Decode hash with hex digest
                    let hashArray = Array.from(new Uint8Array(hash));
                    let hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
                    console.log(hashedPassword);
                    // Attempt to login
                    axios
                    .post(API_URL+'login',{
                        email: email,
                        password: hashedPassword,
                    })
                    .then((res) => {
                        if(res.status === 200) {
                            let customerInfo = res.data.result;
                            console.log(customerInfo);
                            console.log('cookie',document.cookie)
                            document.cookie = 'customer_uid=' + customerInfo.customer_uid;
                            document.cookie = 'customer_last_name=' + customerInfo.customer_last_name;
                            document.cookie = 'customer_first_name=' + customerInfo.customer_first_name;
                            document.cookie = 'customer_email=' + customerInfo.customer_email
                            console.log('cookie',document.cookie)
                            callback();
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        if(err.response) {
                            console.log(err.response);
                        }
                    })
                });
            } else {
                // Did not find email
                console.log('No account found')
            }
        } else {
            // Status not 200
            console.log(res)
        }
    })
    .catch((err) => {
        console.log(err)
        if(err.response) {
            console.log(err.response);
        }
    })
}

export const socialLoginAttempt = (email, refreshToken, callback) => dispatch => {
    axios
    .post(API_URL+'login',{
        email: email,
        token: refreshToken
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
        if(err.response) {
            console.log(err.response);
        }
    })
}