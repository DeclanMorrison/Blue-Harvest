import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default () =>
  <Switch>
    <Route path="/home" exact component={Home} />
    <Route path="/login" exact component={Login} />
  </Switch>;
