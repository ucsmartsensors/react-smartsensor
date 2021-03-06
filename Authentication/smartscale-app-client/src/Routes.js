import Login from "./containers/Login";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup";
import AppliedRoute from "./components/AppliedRoute";
//import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
//import NewShipment from "./containers/NewShipments";
import Shipments from "./containers/Shipments";

export default ({ childProps }) =>
<Switch>
  <AppliedRoute path="/" exact component={Home} props={childProps} />
  <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
  <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
{/*  <AppliedRoute path="/shipments/new" exact component={NewShipment} props={childProps} /> */}
  <AppliedRoute path="/shipment/:id" exact component={Shipments} props={childProps} />
{ /* <AuthenticatedRoute path="/notes/new" exact component={NewNote} props={childProps} /> */}

  { /* Finally, catch all unmatched routes */ }
  <Route component={NotFound} />
</Switch>;

