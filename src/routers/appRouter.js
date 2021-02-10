import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import EmployeeDashboardPage from "../components/EmployeeDashboardPage";
import AddEmployeePage from "../components/AddEmployeePage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import EditEmployeePage from "../components/EditEmployeePage";
import SetNewPMEVTCDatePage from "../components/SetNewPMEVTCDatePage";
import EmployeesListTotalPageContext from "../components/EmployeesListTotalPageContext";
import UsersDashboardPage from "../components/users/UsersDashboardPage";
import EditUserPage from "../components/users/EditUserPage";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true}></PublicRoute>
        <AdminRoute
          path="/users"
          component={UsersDashboardPage}
          exact={true}
        ></AdminRoute>
        <AdminRoute
          path="/users/:id"
          component={EditUserPage}
          exact={true}
        ></AdminRoute>
        <PrivateRoute
          path="/dashboard"
          component={EmployeeDashboardPage}
        ></PrivateRoute>
        <PrivateRoute path="/create" component={AddEmployeePage}></PrivateRoute>
        <PrivateRoute
          path="/employees"
          component={EmployeesListTotalPageContext}
          exact={true}
        ></PrivateRoute>

        <PrivateRoute
          path="/employees/edit/:id"
          component={EditEmployeePage}
        ></PrivateRoute>
        <PrivateRoute
          path="/editPMEVTC/:id"
          component={SetNewPMEVTCDatePage}
        ></PrivateRoute>
        <Route component={NotFoundPage}></Route>
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
