import React from "react";
import { Provider } from "react-redux";
import store from "./reducers/store";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";

import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import ChoosePlan from "./components/ChoosePlan";
import NotFound from "./components/NotFound";
import SelectMeal from "./components/SelectMeal";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      {/* <NavBar /> */}
      <Router>
        <Switch>
          <AppliedRoute exact path='/' component={Landing} />
          <AppliedRoute exact path='/choose-plan' component={ChoosePlan} />
          <AppliedRoute exact path='/select-meal' component={SelectMeal} />
          <AppliedRoute path='*' component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
