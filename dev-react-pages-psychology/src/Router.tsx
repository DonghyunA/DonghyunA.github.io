import React from "react";
import MainPage from "./pages/MainPage";
import AuthForm from "./pages/AuthForm";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/login">
        <AuthForm></AuthForm>
      </Route>
      <Route exact path="/signup">
        <AuthForm></AuthForm>
      </Route>
    </Switch>
  );
};
export default AppRouter;
