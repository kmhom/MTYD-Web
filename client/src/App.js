import React from "react";
import { Provider } from "react-redux";
import store from "./reducers/store";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import { SideNavBar, BottomNavBar } from "./components/NavBar";
import Landing from "./components/Landing";
import ChoosePlan from "./components/ChoosePlan";
import PaymentDetails from "./components/PaymentDetails";
import Profile from "./components/Profile";
import SelectMeal from "./components/SelectMeal";
import NotFound from "./components/NotFound";

import "./App.css";

function App() {
  console.log(process.env);
  return (
    <Provider store={store}>
      <div className='root'>
        <Router>
          <div className='sideNavBar'>
            <SideNavBar />
          </div>
          <div className='mainApp'>
            <Switch>
              <AppliedRoute exact path='/' component={Landing} />
              <AppliedRoute exact path='/choose-plan' component={ChoosePlan} />
              <AppliedRoute
                exact
                path='/payment-details'
                component={PaymentDetails}
              />
              <AppliedRoute exact path='/profile' component={Profile} />
              <AppliedRoute exact path='/select-meal' component={SelectMeal} />
              <AppliedRoute path='*' component={NotFound} />
            </Switch>
          </div>
          <div className='bottomNavBar'>
            <BottomNavBar />
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
