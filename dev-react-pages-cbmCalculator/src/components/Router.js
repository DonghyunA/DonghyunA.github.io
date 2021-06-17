import React from "react";

import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./Main";
import CbmCalculator from "./pages/CbmCalculator";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/cbmCalculator">
          <CbmCalculator></CbmCalculator>
        </Route>
        <Route exact path="/">
          <CbmCalculator></CbmCalculator>
        </Route>
      </Switch>
    </Router>
  );
};
export default AppRouter;
