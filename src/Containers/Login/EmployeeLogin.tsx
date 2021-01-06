/* eslint-disable no-console */
/* eslint-disable promise/always-return */
import React, { useState } from 'react';
import { authenticateEmployee } from '../../DBHandler/EmployeeFunctions';

const EmployeeLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    empID: '',
    password: '',
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  const onEmpIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      empID: event.target.value,
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
    authenticateEmployee(formData.empID.trim(), formData.password.trim())
      .then((result) => {
        console.log(formData.empID.trim(), formData.password.trim());
        console.log(`result = ${result}`);
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
    <>
      <div>
        <h1>Employee Login</h1>
        <form>
          <label htmlFor="employee-id">
            Employee ID
            <input
              type="text"
              name="emp-login"
              value={formData.empID}
              onChange={onEmpIDChange}
            />
          </label>
          <label htmlFor="employee-pwd">
            Password
            <input
              type="password"
              name="emp-login"
              value={formData.password}
              onChange={onPasswordChange}
            />
          </label>
          <button type="submit" onClick={(e) => onSubmit(e)}>
            {' '}
            Login{' '}
          </button>
        </form>
        {buttonPressed ? (
          <h2>{loggedIn ? 'Logged In successfully' : 'Login failed'}</h2>
        ) : null}
      </div>
    </>
  );
};

export default EmployeeLogin;
