import React, { useState } from 'react';
import {useHistory} from "react-router-dom"
import { loginCustomer } from '../../DBHandler/CustomerFunctions';

const CustomerLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    custID: '',
    password: '',
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  const history = useHistory();

  const oncustIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      custID: event.target.value,
    });
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      password: event.target.value,
    });
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    loginCustomer(formData.custID.trim(), formData.password.trim())
      .then((result) => {
        console.log(formData.custID.trim(), formData.password.trim());
        console.log(`result = ${result}`);
        if (result === true) {
          history.push(`/custhome/${formData.custID}`)
          return;
        }
        setLoggedIn(result);
        setButtonPressed(true);
      })
      .catch((err) => {
        setLoggedIn(false);
        setButtonPressed(true);
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Customer Login</h1>
      <form>
        <label htmlFor="customer-id">
          Customer ID
          <input
            type="text"
            name="emp-login"
            value={formData.custID}
            onChange={oncustIDChange}
          />
        </label>
        <br/>
        <label htmlFor="customer-pwd">
          Password
          <input
            type="password"
            name="emp-login"
            value={formData.password}
            onChange={onPasswordChange}
          />
        </label>
        <br/>
        <button type="submit" onClick={(e) => onSubmit(e)}>
          Login
        </button>
      </form>
      {buttonPressed ? (
        <h2>{loggedIn ? 'Logged In successfully' : 'Login failed'}</h2>
      ) : null}
    </div>
  );
};

export default CustomerLogin;