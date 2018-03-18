import Login from "./containers/Login";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Status from "./containers/Status";
import Count from "./containers/Count";
import Shipments from "./containers/Shipments";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default ({ childProps }) =>
<Switch>
  <AppliedRoute path="/" exact component={Home} props={childProps} />
  <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
  <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
{ /* <AuthenticatedRoute path="/notes/new" exact component={NewNote} props={childProps} /> */}

  <AuthenticatedRoute path="/Count" exact component={Count} props={childProps} />
  <AuthenticatedRoute path="/Status" exact component={Status} props={childProps} />
  <AuthenticatedRoute path="/Shipments" exact component={Shipments} props={childProps} />

  { /* Finally, catch all unmatched routes */ }
  <Route component={NotFound} />
</Switch>;
