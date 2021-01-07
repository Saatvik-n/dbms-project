import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';

import Homepage from './Components/Homepage/Homepage';

import EmployeeLogin from './Containers/Login/EmployeeLogin';
import CustomerLogin from "./Containers/Login/CustomerLogin"
import RegisterEmployee from './Containers/Register/RegisterEmployee';
import RegisterCustomer from "./Containers/Register/RegisterCustomer";

import AddMeters from "./Containers/Customer/Meters/AddMeters"

import CustomerHome from "./Containers/Customer/CustomerHome";


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
          <Route path="/custhome/:custid" exact component={CustomerHome} />
          <Route path="/addmeters/:custid" exact component={AddMeters} />
          <Route path="/" exact component={Homepage} />
        </Switch>
      </Router>
    </>
  );
}
