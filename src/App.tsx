import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Navigation from './Components/Navbar/Navigation';

import Homepage from './Components/Homepage/Homepage';

import EmployeeLogin from './Containers/Login/EmployeeLogin';
import CustomerLogin from "./Containers/Login/CustomerLogin"
import RegisterEmployee from './Containers/Register/RegisterEmployee';
import RegisterCustomer from "./Containers/Register/RegisterCustomer";

import AddMeters from "./Containers/Customer/Meters/AddMeters"
import Usage from "./Containers/Customer/Meters/Usage"
import SetMeters from "./Containers/Customer/Meters/SetMeters"

import Bills from "./Containers/Customer/Bills/Bills"
import BillStatus from "./Containers/Customer/Bills/BillStatus"

import ComplaintsHome from "./Containers/Customer/Complaints/ComplaintsHome"

import CustomerHome from "./Containers/Customer/CustomerHome";

import EmployeeHome from "./Containers/Employee/EmployeeHome"

import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  return (
    <>
      <Router>
      <Navigation />
        <Switch>
          <Route path="/emplogin" exact component={EmployeeLogin} />
          <Route path="/custlogin" exact component={CustomerLogin} />
          <Route path="/empreg" exact component={RegisterEmployee} />
          <Route path="/custreg" exact component={RegisterCustomer} />
          <Route path="/custhome/:custid" exact component={CustomerHome} />
          <Route path="/addmeters/:custid" exact component={AddMeters} />
          <Route path="/usage/:custid" exact component={Usage} />
          <Route path="/setmeters/:custid" exact component={SetMeters} />
          <Route path="/bills/:custid" exact component={Bills}  />
          <Route path="/billstatus/:custid" exact component={BillStatus} />
          <Route path="/complaints/:custid" exact component={ComplaintsHome} />

          <Route path="/emphome/:empid" exact component={EmployeeHome} />
          <Route path="/" exact component={Homepage} />
        </Switch>
      </Router>
    </>
  );
}
