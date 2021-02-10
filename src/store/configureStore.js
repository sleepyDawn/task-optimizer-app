import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import filtersReducer from "../reducers/filters";
import authReducer from "../reducers/auth";
import employeesReducer from "../reducers/employeesReducer";
import usersReducer from "../reducers/usersReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  // Store Creation
  const store = createStore(
    combineReducers({
      filters: filtersReducer,
      auth: authReducer,
      employees: employeesReducer,
      users: usersReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
