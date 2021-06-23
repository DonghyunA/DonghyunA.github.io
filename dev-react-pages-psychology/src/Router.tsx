import React from "react";
import MainPage from "./pages/MainPage";
import AuthForm from "./pages/AuthForm";
import SignUp from "./pages/SignUp";
import MainContents from "./elements/Contents/MainContents";
import RegisterTestContents from "./elements/Contents/RegisterTestContents";
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
      <Route exact path="/register">
        <RegisterTestContents></RegisterTestContents>
      </Route>
      <Route exact path={["/main", "/"]}>
        <MainContents></MainContents>
      </Route>
    </Switch>
  );
};
export default AppRouter;
