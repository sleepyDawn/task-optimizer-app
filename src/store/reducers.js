import { combineReducers } from "redux";

import filtersReducer from "../reducers/filters";
import authReducer from "../reducers/auth";
import employeesReducer from "../reducers/employeesReducer";
import usersReducer from "../reducers/usersReducer";

const appReducer = combineReducers({
  filters: filtersReducer,
  auth: authReducer,
  employees: employeesReducer,
  users: usersReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
