import { applyMiddleware, compose, createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise";
import rootReducer from "./reducers";

const logger = createLogger({
  collapsed: true
  // diff: true,
});

// const persistConfig = {
//   key: "root",
//   storage
// };

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
    let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, promise, logger)))
    window.Store = store;
    return { store }
  }

