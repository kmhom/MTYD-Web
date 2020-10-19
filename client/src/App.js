import React from "react";
import { Provider } from "react-redux";
import store from "./reducers/store";
import {
  BrowserRouter as Router,
  // Route, Redirect,
  Switch,
} from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import { SideNavBar, BottomNavBar } from "./components/NavBar";
import Landing from "./components/Landing";
import SignUp from "./components/SignUp";
import SocialSignUp from "./components/SocialSignUp";
import ChoosePlan from "./components/ChoosePlan";
import PaymentDetails from "./components/PaymentDetails";
import Profile from "./components/Profile";
import SelectMeal from "./components/SelectMeal";
import NotFound from "./components/NotFound";
import "./App.css";
import AuthApi from "./components/AuthApi";
import Cookies from "js-cookie";


const viewportContext = React.createContext({});

const ViewportProvider = ({ children }) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};

const useViewport = () => {
  const { width, height } = React.useContext(viewportContext);
  return { width, height };
};

const MobileComponent = () => {
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
              <AppliedRoute exact path='/sign-up' component={SignUp} />
              <AppliedRoute
                exact
                path='/social-sign-up'
                component={SocialSignUp}
              />
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
};

const DesktopComponent = () => {
  return(
    <p>"Wow, your screen is big!"</p>
  );
};

const MyComponent = () => {
  const { width } = useViewport();
  const breakpoint = 620;

  return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
};

function App() {
  const [auth, setAuth] = React.useState(false);
  const readCookie = () => {
    const customer = Cookies.get("customer_uid");
    // console.log(customer);
    if (customer) {
      setAuth(true);
    }
  };

  React.useEffect(() => {
    readCookie();
  }, []);

  return (
    <ViewportProvider>
      <MyComponent />
    </ViewportProvider>
  );
}

export default App;
