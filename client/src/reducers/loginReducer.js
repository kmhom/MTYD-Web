import {
    CHANGE_EMAIL, CHANGE_PASSWORD, SUBMIT_PASSWORD,
    CHANGE_NEW_EMAIL, CHANGE_NEW_PASSWORD, CHANGE_NEW_PASSWORD_CONFIRM,
    CHANGE_NEW_FIRST_NAME, CHANGE_NEW_LAST_NAME, CHANGE_NEW_PHONE,
    CHANGE_NEW_STREET, CHANGE_NEW_UNIT, CHANGE_NEW_CITY,
    CHANGE_NEW_STATE, CHANGE_NEW_ZIP, SUBMIT_PASSWORD_SIGNUP,
} from "./actions/loginTypes";

const initialState = {
    email: '',
    password: '',
    newUserInfo: {
        email: '',
        password: '',
        passwordConfirm: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: {
            street: '',
            unit: '',
            city: '',
            state: '',
            zip: '',
        },
    },
}

export default function(state = initialState, action) {
    switch(action.type) {
        
        case CHANGE_EMAIL:
            return {
                ...state,
                email: action.payload,
            }

        case CHANGE_PASSWORD:
            return {
                ...state,
                password: action.payload,
            }

        case SUBMIT_PASSWORD:
            return {
                ...state,
                email: '',
                password: '',
            }

        case CHANGE_NEW_EMAIL:
            return {
                ...state,
                newUserInfo: {
                    ...state.newUserInfo,
                    email: action.payload,
                }
            }

        case CHANGE_NEW_PASSWORD:
            return {
                ...state,
                newUserInfo: {
                    ...state.newUserInfo,
                    password: action.payload,
                }
            }

        case CHANGE_NEW_PASSWORD_CONFIRM:
            return {
                ...state,
                newUserInfo: {
                    ...state.newUserInfo,
                    passwordConfirm: action.payload,
                }
            }

        case CHANGE_NEW_FIRST_NAME:
            return {
                ...state,
                newUserInfo: {
                    ...state.newUserInfo,
                    firstName: action.payload,
                }
            }

        case CHANGE_NEW_LAST_NAME:
            return {
                ...state,
                newUserInfo: {
                    ...state.newUserInfo,
                    lastName: action.payload,
                }
            }

        case CHANGE_NEW_PHONE:
            return {
                ...state,
                newUserInfo: {
                    ...state.newUserInfo,
                    phone: action.payload,
                }
            }

        case CHANGE_NEW_STREET:
            return {
                ...state,
                newUserInfo: {
                    ...state.newUserInfo,
                    address: {
                        ...state.newUserInfo.address,
                        street: action.payload
                    }
                }
            }

        case CHANGE_NEW_UNIT:
            return {
                ...state,
                newUserInfo: {
                    ...state.newUserInfo,
                    address: {
                        ...state.newUserInfo.address,
                        unit: action.payload
                    }
                }
            }

        case CHANGE_NEW_CITY:
            return {
                ...state,
                newUserInfo: {
                    ...state.newUserInfo,
                    address: {
                        ...state.newUserInfo.address,
                        city: action.payload
                    }
                }
            }

        case CHANGE_NEW_STATE:
            return {
                ...state,
                newUserInfo: {
                    ...state.newUserInfo,
                    address: {
                        ...state.newUserInfo.address,
                        state: action.payload
                    }
                }
            }

        case CHANGE_NEW_ZIP:
            return {
                ...state,
                newUserInfo: {
                    ...state.newUserInfo,
                    address: {
                        ...state.newUserInfo.address,
                        zip: action.payload
                    }
                }
            }

        case SUBMIT_PASSWORD_SIGNUP:
            return {
                ...state,
            }

        default:
            return state;

    }
}