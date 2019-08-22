import {handleActions} from 'redux-actions';

const defaultState = {
    user: null,
    loggingIn: false,
    loginError: null,
};

export default handleActions({

    AUTH: {
        START: (state) => {
            return {
                ...state,
                loggingIn: true,
                loginError: null,
            };
        },
        FAILURE: (state, action) => {
            return {
                ...state,
                loggingIn: false,
                accessToken: null,
                user: null,
                loginError: action.payload,
            };
        },
        SUCCESS: (state, action) => {
            return {
                ...state,
                loggingIn: false,
                refreshToken: action.payload.refreshToken,
                user: action.payload.email,
                loginError: null,
            };
        },
        // replace logout to root reducer
        // LOGOUT: (state, action) => {
        //     return {
        //         ...state,
        //         loggingIn: false,
        //         accessToken: null,
        //         user: null,
        //         mfaRequired: false,
        //         test: action.payload
        //     };
        // }
    }
}, defaultState);