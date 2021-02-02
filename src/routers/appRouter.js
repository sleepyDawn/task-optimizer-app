import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import EmployeeDashboardPage from "../components/EmployeeDashboardPage";
import AddEmployeePage from "../components/AddEmployeePage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import EditEmployeePage from "../components/EditEmployeePage";
import SetNewPMEDatePage from "../components/SetNewPME-VTCDatePage";
import EmployeesListPage from "../components/EmployeesListPage";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true}></PublicRoute>
        <PrivateRoute
          path="/dashboard"
          component={EmployeeDashboardPage}
        ></PrivateRoute>
        <PrivateRoute path="/create" component={AddEmployeePage}></PrivateRoute>
        <PrivateRoute
          path="/employees"
          component={EmployeesListPage}
          exact={true}
        ></PrivateRoute>
        <PrivateRoute
          path="/employees/edit/:id"
          component={EditEmployeePage}
        ></PrivateRoute>
        <PrivateRoute
          path="/editPME-VTC/:id"
          component={SetNewPMEDatePage}
        ></PrivateRoute>
        <Route component={NotFoundPage}></Route>
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
