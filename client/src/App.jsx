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

// const authentication = {
//   isLoggedIn: false,
//   onAuthentication() {
//     this.isLoggedIn = true;
//   },
//   getLoginStatus() {
//     return this.isLoggedIn;
//   },
// };

// function SecuredRoute(props) {
//   return (
//     <Route
//       path={props.path}
//       render={(data) =>
//         authentication.getLoginStatus() ? (
//           <props.component {...data}></props.component>
//         ) : (
//           <Redirect to={{ pathname: "/" }}></Redirect>
//         )
//       }
//     ></Route>
//   );
// }

function App() {
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
