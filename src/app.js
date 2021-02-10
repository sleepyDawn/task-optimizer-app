// install  => import => use
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import moment from "moment";

import AppRouter, { history } from "./routers/appRouter";
import configureStore from "./store/configureStore";
import { startSetEmployees } from "./actions/employees";
import { login, logout, startAuthorizationOnLogin } from "./actions/auth";
import { startSetUsers, removeAllUsers } from "./actions/users";
import LoadingPage from "./components/LoadingPage";
import Error from "./components/Error";

import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";

// import "./firebase/firebase";
import { firebase } from "./firebase/firebase";

// import "./playground/promises";

const store = configureStore();
// console.log("testing source map");
// console.log("checking store after configuration::", store);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
const rootElement = document.getElementById("app");

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, rootElement);
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage></LoadingPage>, rootElement);

firebase.auth().onAuthStateChanged((authUser) => {
  if (authUser) {
    // console.log({ user });

    store.dispatch(login(authUser.uid));
    const userName = authUser.displayName;
    const emailId = authUser.email;

    store
      .dispatch(startAuthorizationOnLogin({ userName, emailId }, authUser.uid))
      .then(() => {
        // Setting the employees list in redux store
        return store.dispatch(startSetEmployees());
      })
      .then(() => {
        // Setting the userslist state in store if loggedIn(authUser) is admin role with GLOBAL unit

        return store.dispatch(startSetUsers());
      })
      .then(() => {
        console.log("checking before rendering app");
        renderApp();
        if (history.location.pathname === "/") {
          history.push("/dashboard");
        }
      })
      .catch((e) => {
        console.log("Error: ", e);
        ReactDOM.render(<Error message={e.message}></Error>, rootElement);
      });
  } else {
    renderApp();
    history.push("/");
    store.dispatch({ type: "USER_LOGOUT" });
    store.dispatch(logout());
  }
});
