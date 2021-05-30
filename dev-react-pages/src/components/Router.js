import React from "react";
import CbmCalculator from "./CbmCalculator"
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./Main";

const AppRouter = () =>{
    return (
        <Router>
            <Switch>
                <Route exact path="/cbmCalculator">
                    <CbmCalculator></CbmCalculator>
                </Route>
                <Route exact path="/">
                    <Main></Main>
                </Route>
            </Switch>
        </Router>
    )
}
export default AppRouter;