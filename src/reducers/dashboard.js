import { handleActions } from "redux-actions";

const defaultState = {
  loading: false,
  fetchError: null,
  leads: [],
  currentLead: {},
  partners: []
};

export default handleActions(
  {
    DASHBOARD: {
      START: state => {
        return {
          ...state,
          loading: true,
          fetchError: null
        };
      },
      FAILURE: (state, action) => {
        return {
          ...state,
          loading: false,
          fetchError: action.payload
        };
      },
      SUCCESS: (state, action) => {
        return {
          ...state,
          loading: false,
          leads: action.payload
        };
      },
      UPDATED: (state, action) => {
        return {
          ...state,
          currentLead: action.payload
        };
      },
      SETSINGLELEAD: (state, action) => {
        return {
          ...state,
          currentLead: action.payload
        };
      },
      SETPARTNERS: (state, action) => {
        return {
          ...state,
          partners: action.payload
        }
      },
      CLEARSINGLELEAD: (state, action) => {
        return {
          ...state,
          currentLead: {}
        };
      },
    }
  },
  defaultState
);
