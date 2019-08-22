import {handleActions} from 'redux-actions';

const defaultState = {
    partners: [],
    partnerCreated: false,
    loading: false,
    fetchError: null,
};

export default handleActions({

    PARTNERS: {
        START: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        GETPARTNERSFAILURE: (state, action) => {
            return {
                ...state,
                loading: false,
                fetchError: action.payload.error
            };
        },
        GETPARTNERSSUCCESS: (state, action) => {
            return {
                ...state,
                loading: false,
                partners: action.payload,
                fetchError: null,
            };
        },
        CREATEPARTNERSUCCESS: (state, action) => {
            return {
                ...state,
                loading: false,
                partnerCreated: true,
                fetchError: null,
            };
        },
        CREATEPARTNERFAILURE : (state, action) => {
            return {
                ...state,
                loading: false,
                partnerCreated: false,
                fetchError: action.payload
            };
        },
    }
}, defaultState);