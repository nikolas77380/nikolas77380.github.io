import { authentication } from "./../FireBase/firebase";
import { createActions } from "redux-actions";

const actions = {
  AUTH: {
    START: v => v,
    SUCCESS: v => v,
    FAILURE: v => v,
    LOGOUT: v => v
  }
};

const { auth } = createActions(actions);

export function signInWithCustomToken() {
  return async dispatch => {
    const email = sessionStorage.getItem('login');
    const password = sessionStorage.getItem('password');
    if(email == null || !password == null) {
      dispatch(auth.logout());
      return;
    }
    dispatch(auth.start());
    authentication
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        dispatch(
          auth.success({
            email: data.user.email,
            refreshToken: data.user.refreshToken
          })
        )
      })
      .catch(error => {
        console.log(error);
        dispatch(auth.failure(error));
      });
      
  };
}

export function loginByPassword(email, password) {
  return async dispatch => {
    dispatch(auth.start());
    await authentication
      .signInWithEmailAndPassword(email, password)
      .then(data => {
            sessionStorage.setItem("login", email);
            sessionStorage.setItem("password", password);
        dispatch(
          auth.success({
            email: data.user.email,
            refreshToken: data.user.refreshToken
          })
        );
      })
      .catch(error => {
        console.log(error);
        dispatch(auth.failure(error));
      });
  };
}

export function logOut() {
  return async dispatch => {
    authentication
      .signOut()
      .then(function() {
          sessionStorage.removeItem("login");
          sessionStorage.removeItem("password");
        dispatch(auth.logout());
      })
      .catch(function(error) {
        // An error happened.
      });
  };
}
