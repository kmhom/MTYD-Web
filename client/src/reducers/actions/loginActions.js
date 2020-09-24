import axios from 'axios';

import {
    CHANGE_EMAIL, CHANGE_PASSWORD, SUBMIT_PASSWORD,
    CHANGE_NEW_EMAIL, CHANGE_NEW_PASSWORD, CHANGE_NEW_PASSWORD_CONFIRM,
    CHANGE_NEW_FIRST_NAME, CHANGE_NEW_LAST_NAME, CHANGE_NEW_PHONE,
    CHANGE_NEW_STREET, CHANGE_NEW_UNIT, CHANGE_NEW_CITY,
    CHANGE_NEW_STATE, CHANGE_NEW_ZIP, SUBMIT_PASSWORD_SIGNUP,
} from './loginTypes'

import { API_URL, BING_LCOATION_API_URL} from '../constants'

// Actions for Login Page

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
                // console.log(hashAlg,salt);
                let saltedPassword = password + salt;
                // console.log(saltedPassword);
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
                    // console.log(hashedPassword);
                    // Attempt to login
                    axios
                    .post(API_URL+'login',{
                        email: email,
                        password: hashedPassword,
                    })
                    .then((res) => {
                        if(res.status === 200) {
                            let customerInfo = res.data.result;
                            // console.log(customerInfo);
                            // console.log('cookie',document.cookie)
                            document.cookie = 'customer_uid=' + customerInfo.customer_uid;
                            document.cookie = 'customer_last_name=' + customerInfo.customer_last_name;
                            document.cookie = 'customer_first_name=' + customerInfo.customer_first_name;
                            document.cookie = 'customer_email=' + customerInfo.customer_email;
                            document.cookie = 'customer_social_media=' + customerInfo.user_social_media;
                            // console.log('cookie',document.cookie)
                            dispatch({
                                type: SUBMIT_PASSWORD,
                            })
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
        console.log(err);
        if(err.response) {
            console.log(err.response);
            if(err.response.data.message === 'Email Not Found') {
                // Social Media Sign UP
            }
        }
    })
}

export const bypassLogin = (email, hashedPassword, callback) => dispatch => {
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
}

// Actions for Sign Up Page

export const changeNewEmail = (newEmail) => dispatch => {
    dispatch({
        type: CHANGE_NEW_EMAIL,
        payload: newEmail,
    })
}

export const changeNewPassword = (newPassword) => dispatch => {
    dispatch({
        type: CHANGE_NEW_PASSWORD,
        payload: newPassword,
    })
}

export const changeNewPasswordConfirm = (newPassword) => dispatch => {
    dispatch({
        type: CHANGE_NEW_PASSWORD_CONFIRM,
        payload: newPassword,
    })
}

export const changeNewFirstName = (newFirstName) => dispatch => {
    dispatch({
        type: CHANGE_NEW_FIRST_NAME,
        payload: newFirstName,
    })
}

export const changeNewLastName = (newLastName) => dispatch => {
    dispatch({
        type: CHANGE_NEW_LAST_NAME,
        payload: newLastName,
    })
}

export const changeNewPhone = (newPhone) => dispatch => {
    dispatch({
        type: CHANGE_NEW_PHONE,
        payload: newPhone,
    })
}

export const changeNewAddress = (newAddress) => dispatch => {
    dispatch({
        type: CHANGE_NEW_STREET,
        payload: newAddress,
    })
}

export const changeNewUnit = (newUnit) => dispatch => {
    dispatch({
        type: CHANGE_NEW_UNIT,
        payload: newUnit,
    })
}

export const changeNewCity = (newCity) => dispatch => {
    dispatch({
        type: CHANGE_NEW_CITY,
        payload: newCity
    })
}

export const changeNewState = (newState) => dispatch => {
    dispatch({
        type: CHANGE_NEW_STATE,
        payload: newState,
    })
}

export const changeNewZip = (newZip) => dispatch => {
    dispatch({
        type: CHANGE_NEW_ZIP,
        payload: newZip,
    })
}

export const submitPasswordSignUp = (
    email, password, passwordConfirm, firstName, lastName, phone,
    street, unit, city, state, zip
) => dispatch => {
    if(password === passwordConfirm) {
        axios
        .get(BING_LCOATION_API_URL,{
            params: {
                CountryRegion: 'US',
                adminDistrict: state,
                locality: city,
                postalCode: zip,
                addressLine: street,
                key: process.env.REACT_APP_BING_LOCATION_KEY,
            }
        })
        .then((res) => {
            console.log(state);
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
                let object = {
                    email: email,
                    password: password,
                    first_name: firstName,
                    last_name: lastName,
                    phone_number: phone,
                    address: street,
                    unit: unit,
                    city: city,
                    state: state,
                    zip_code: zip,
                    latitude: lat,
                    longitude: long,
                    referral_source: 'Website',
                    role: 'customer',
                    social: false,
                }
                console.log(JSON.stringify(object));
                axios
                .post(API_URL+'signup',object)
                .then((res) => {
                    console.log(res);
                    dispatch({
                        type: SUBMIT_PASSWORD_SIGNUP,
                    })
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
    } else {
        console.log('Not matching password setting')
    }
}