import { handleActions } from "redux-actions";

const defaultState = {
    leads: [],
    currentLead: {},
    files: {},
    applicationSelected: {},
    loading: false
};

export default handleActions(
    {
        LEADS: {
            START: state => {
                return {
                    ...state,
                    loading: true,
                };
            },
            UPDATELEAD: (state, action) => {
                return {
                    ...state,
                    loading: false,
                    currentLead: action.payload
                };
            },
            UPDATEAPPLICATION: (state, action) => {
                return {
                    ...state,
                    loading: false,
                    applicationSelected: action.payload
                };
            },
            SETFILES: (state, action) => {
                return {
                    ...state,
                    files: action.payload
                }
            },
            SETSINGLELEAD: (state, action) => {
                return {
                    ...state,
                    loading: false,
                    currentLead: action.payload
                };
            },
            SETPARTNERS: (state, action) => {
                return {
                    ...state,
                    loading: false,
                    partners: action.payload
                }
            },
        }
    },
    defaultState
);
