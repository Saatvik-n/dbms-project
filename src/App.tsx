import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import EmployeeLogin from './Containers/Login/EmployeeLogin';
import CustomerLogin from "./Containers/Login/CustomerLogin"
import RegisterEmployee from './Containers/Register/RegisterEmployee';
import RegisterCustomer from "./Containers/Register/RegisterCustomer"
import Navbar from './Components/Navbar/Navbar';

export default function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Switch>
          <Route path="/emplogin" exact component={EmployeeLogin} />
          <Route path="/custlogin" exact component={CustomerLogin} />
          <Route path="/empreg" exact component={RegisterEmployee} />
          <Route path="/custreg" exact component={RegisterCustomer} />
          <Route path="/" exact component={Homepage} />
        </Switch>
      </Router>
    </>
  );
}
