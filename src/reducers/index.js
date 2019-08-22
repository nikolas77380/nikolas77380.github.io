import {combineReducers} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import auth from './auth';
import leads from './leads.js';
import dashboard from './dashboard';
import partners from './partners';

const createFilteredReducer = (reducerFunction, reducerPredicate) =>
    (state, action) => {
        const isInitializationCall = state === undefined;
        const shouldRunWrappedReducer = reducerPredicate(action) || isInitializationCall;
        return shouldRunWrappedReducer ? reducerFunction(state, action) : state;
    };

const filter = (key) => action => action.type.startsWith(key);

const appReducer = combineReducers({
    auth:                createFilteredReducer(auth,          filter('AUTH')),
    dashboard:           createFilteredReducer(dashboard,     filter('DASHBOARD')),
    leads:           createFilteredReducer(leads,     filter('LEADS')),
    partners:            createFilteredReducer(partners,     filter('PARTNERS')),
});

const rootReducer = (state,action) => {
    if (action.type === 'AUTH/LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer;