import axios from 'axios';

import {
    LOGOUT_LOGIN, CHANGE_EMAIL, CHANGE_PASSWORD, SUBMIT_PASSWORD, SUBMIT_SOCIAL,
    START_APPLE_SIGNUP, CHANGE_NEW_EMAIL, CHANGE_NEW_PASSWORD, CHANGE_NEW_PASSWORD_CONFIRM,
    CHANGE_NEW_FIRST_NAME, CHANGE_NEW_LAST_NAME, CHANGE_NEW_PHONE,
    CHANGE_NEW_STREET, CHANGE_NEW_UNIT, CHANGE_NEW_CITY,
    CHANGE_NEW_STATE, CHANGE_NEW_ZIP, SUBMIT_SIGNUP,
} from './loginTypes'

import { API_URL, BING_LCOATION_API_URL} from '../constants'

// Auxillary functions

export const preCallback = (customer_uid, callback) => {
    axios
    .get(API_URL+'customer_lplp',{
        params: {
            customer_uid: customer_uid,
        }
    })
    .then((res) => {
        console.log(res);
        callback(res.data.result !== undefined);
    })
    .catch((err) => {
        console.log(err);
        if(err.response) {
            console.log(err.response);
        }
    })
}

export const resetLogin = (callback) => dispatch => {
    document.cookie = 'customer_uid=1;max-age=0';
    document.cookie = 'customer_last_name=1;max-age=0';
    document.cookie = 'customer_first_name=1;max-age=0';
    document.cookie = 'customer_email=1;max-age=0';
    document.cookie = 'customer_social_media=1;max-age=0';
    if(typeof callback !== 'undefined') {
        callback();
    }
    dispatch({
        type: LOGOUT_LOGIN,
    })
}

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
    .post(API_URL+'accountsalt',{
        email: email,
    })
    .then((res) => {
        let saltObject = res;
        console.log(saltObject);
        if(!(saltObject.data.code && saltObject.data.code !== 200)) {
            let hashAlg = saltObject.data.result[0].password_algorithm;
            let salt = saltObject.data.result[0].password_salt;
            if(hashAlg !== null && salt !== null)  {
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
                        social_id: '',
                        signup_platform: ''
                    })
                    .then((res) => {
                        // Handle successful Login
                        if(res.data.code === 200) {
                            let customerInfo = res.data.result[0];
                            console.log(customerInfo);
                            console.log('cookie',document.cookie)
                            document.cookie = 'customer_uid=' + customerInfo.customer_uid;
                            console.log('cookie',document.cookie)
                            dispatch({
                                type: SUBMIT_PASSWORD,
                            })
                            preCallback(customerInfo.customer_uid,callback);
                        } else if (res.data.code === 406 || res.data.code === 404) {
                            console.log('Invalid credentials')
                        } else if (res.data.code === 401) {
                            console.log('Need to log in by social media')
                        } else {
                            console.log('Unknown login error')
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
                // No hash/salt information, probably need to sign in by socail media
                console.log('Salt not found')
                // Try to login anyway to confirm
                axios
                .post(API_URL+'login',{
                    email: email,
                    password: 'test',
                    social_id: '',
                    signup_platform: ''
                })
                .then((res) => {
                    // Don't expect success, checking for need to log in by social media
                    if (res.data.code === 401) {
                        console.log('Need to log in by social media')
                    } else {
                        console.log('Unknown login error')
                    }
                })
                // Catch unkown Login errors
                .catch((err) => {
                    console.log(err);
                    if(err.response) {
                        console.log(err.response);
                    }
                })
            }
        // No information from Account Salt endpoint, probably invalid credentials
        } else {
            // Status not 200
            console.log('Invalid credentials')
        }
    })
    // Error for Account Salt endpoint
    .catch((err) => {
        console.log(err)
        if(err.response) {
            console.log(err.response);
        }
    })
}

export const socialLoginAttempt = (email, accessToken, refreshToken, platform, successCallback, signupCallback) => dispatch => {
    console.log(email,refreshToken)
    axios
    .post(API_URL+'login',{
        email: email,
        password: '',
        social_id: refreshToken,
        signup_platform: platform,
    })
    .then((res) => {
        console.log(res);
        if(!(res.data.code && res.data.code !== 200)) {
            let customerInfo = res.data.result[0];
            console.log(customerInfo);
            console.log('cookie',document.cookie)
            document.cookie = 'customer_uid=' + customerInfo.customer_uid;
            console.log('cookie',document.cookie)
            axios
            .post(API_URL+'token_fetch_update/update_web',{
                uid: customerInfo.customer_uid,
                user_access_token: accessToken,
                user_refresh_token: 'FALSE',
            })
            .then((res) => {
                console.log(res);
                preCallback(customerInfo.customer_uid,successCallback);
            })
            .catch((err) => {
                if(err.response) {
                    console.log(err.response);
                }
                console.log(err);
                preCallback(customerInfo.customer_uid,successCallback);
            })
        } else if(res.data.code === 404) {
            dispatch({
                type: SUBMIT_SOCIAL,
                payload: {
                    email: email,
                    platform: platform,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                }
            })
            signupCallback();
        }
    })
    // Catch Login endpoint error
    .catch((err) => {
        console.log(err);
        if(err.response) {
            console.log(err.response);
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
        if(!(res.data.code && res.data.code !== 200)) {
            let customerInfo = res.data.result[0];
            console.log(customerInfo);
            console.log('cookie',document.cookie)
            document.cookie = 'customer_uid=' + customerInfo.customer_uid;
            console.log('cookie',document.cookie)
            preCallback(customerInfo.customer_uid,callback);
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

export const initAppleSignUp = (newId, callback) => dispatch => {
    axios
    .get(API_URL+'Profile/'+newId)
    .then((res) => {
        console.log(res);
        let newUserInfo = res.data.result[0];
        let email = newUserInfo.customer_email;
        let refreshToken = newUserInfo.user_refresh_token;
        dispatch({
            type: START_APPLE_SIGNUP,
            payload: {
                customerId: newId,
                email: email,
                refreshToken: refreshToken,
            }
        });
        callback()
    })
    .catch((err) => {
        console.log(err);
        if(err.response) {
            console.log(err.response);
        }
    })
}

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
    street, unit, city, state, zip, callback
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
                    latitude: lat.toString(),
                    longitude: long.toString(),
                    referral_source: 'WEB',
                    role: 'CUSTOMER',
                    social: 'FALSE',
                    social_id: 'NULL',
                    user_access_token: 'FALSE',
                    user_refresh_token: 'FALSE',
                    mobile_access_token: 'FALSE',
                    mobile_refresh_token: 'FALSE',
                }
                console.log(JSON.stringify(object));
                axios
                .post(API_URL+'signup',object)
                .then((res) => {
                    console.log(res);
                    let customerInfo = res.data.result.customer_uid;
                    console.log(customerInfo);
                    console.log('cookie',document.cookie)
                    document.cookie = 'customer_uid=' + customerInfo;
                    console.log('cookie',document.cookie)
                    preCallback(customerInfo.customer_uid,callback);
                    dispatch({
                        type: SUBMIT_SIGNUP,
                    })
                    if(typeof callback !== 'undefined') {
                        callback();
                    }
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

export const submitSocialSignUp = (
    isApple, customerId,
    email, platform, accessToken, refreshToken, firstName, lastName, phone,
    street, unit, city, state, zip, callback
) => dispatch => {
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
            let object = {};
            if(!isApple) {
                object = {
                    email: email,
                    first_name: firstName,
                    last_name: lastName,
                    phone_number: phone,
                    address: street,
                    unit: unit,
                    city: city,
                    state: state,
                    zip_code: zip,
                    latitude: lat.toString(),
                    longitude: long.toString(),
                    referral_source: 'WEB',
                    role: 'CUSTOMER',
                    social: platform,
                    social_id: refreshToken,
                    user_access_token: accessToken,
                    user_refresh_token: 'FALSE',
                    mobile_access_token: 'FALSE',
                    mobile_refresh_token: 'FALSE',
                }
            } else {
                object = {
                    cust_id: customerId,
                    email: email,
                    first_name: firstName,
                    last_name: lastName,
                    phone_number: phone,
                    address: street,
                    unit: unit,
                    city: city,
                    state: state,
                    zip_code: zip,
                    latitude: lat.toString(),
                    longitude: long.toString(),
                    referral_source: 'Website',
                    role: 'customer',
                    social: platform,
                    referral_source: 'WEB',
                    role: 'CUSTOMER',
                    social: platform,
                    social_id: refreshToken,
                    user_access_token: accessToken,
                    user_refresh_token: 'FALSE',
                    mobile_access_token: 'FALSE',
                    mobile_refresh_token: 'FALSE',
                }
            }
            console.log(JSON.stringify(object));
            axios
            .post(API_URL+'signup',object)
            .then((res) => {
                console.log(res);
                if(customerId === '') {
                    customerId = res.data.result.customer_uid;
                }
                dispatch({
                    type: SUBMIT_SIGNUP,
                })
                console.log('cookie',document.cookie)
                document.cookie = 'customer_uid=' + customerId;
                console.log('cookie',document.cookie)
                callback()
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