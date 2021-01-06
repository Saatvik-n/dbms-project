import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import EmployeeLogin from './Containers/Login/EmployeeLogin';

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/emplogin" exact component={EmployeeLogin} />
          <Route path="/" exact component={Homepage} />
        </Switch>
      </Router>
    </>
  );
}
