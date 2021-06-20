import React from "react";
import MainPage from "./pages/MainPage";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/test">
        </Route>
        <Route exact path="/">
            <MainPage></MainPage>
        </Route>
      </Switch>
    </Router>
  );
};
export default AppRouter;
