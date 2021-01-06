/* eslint-disable */
import React, { useState } from 'react';
import { createNewEmployee } from '../../DBHandler/EmployeeFunctions';

interface fdata {
  [index: string]: string
}

let initialObject: fdata = {
    empID: '',
    password: '',
    name: '',
    phone: '',
    authPassword: ''
}

const RegisterEmployee: React.FC = () => {
  const [formData, setFormData] = useState(initialObject);
  const [empCreated, setEmpCreated] = useState(false);
  const [creationError, setCreationError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAuth, setIsAuth] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, toChange: string) => {
    let newFormData = {
      ...formData
    }
    switch (toChange) {
        case "empID":
            newFormData.empID = event.target.value.trim();
            setFormData(newFormData)
            break;
        case "password":
            newFormData.password = event.target.value.trim();
            setFormData(newFormData)
            break;
        case "name":
            newFormData.name = event.target.value.trim();
            setFormData(newFormData)
            break;
        case "phone":
          newFormData.phone = event.target.value.trim();
            setFormData(newFormData)
            break;
        case "authPassword":
          newFormData.authPassword = event.target.value.trim();
          setFormData(newFormData)
          break;
        default:
            break;
    }
  }

  const createEmployee = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    for (const prop in formData) {
      if (formData[prop].trim() === '') {
        setShowModal(true);
        return;
      }
    }
    setShowModal(false);
    if (formData.authPassword !== 'abcxyz') {
      setIsAuth(false);
      return;
    }
    setIsAuth(true);
    createNewEmployee(formData.empID, formData.password, formData.name, formData.phone)
    .then(result => {
      console.log(result);
      setEmpCreated(true);
      if (result === false) {
        setCreationError(true);
      }
      else {
        setCreationError(false);
      }
    })
    .catch(err => {
      console.log(err);
      setCreationError(true);
    })
  }

  return (
      <div>
          <h1>Register a new employee</h1>
          <h3>
            {showModal ? "Every input field should be filled" : null}
          </h3>
          <form>
          <label htmlFor="employee-id">
            Employee ID
            <input
              type="text"
              name="emp-login"
              value={formData.empID}
              onChange={(e) => handleChange(e, 'empID')}
            />
          </label>
          <br/>
          <label htmlFor="employee-pwd">
            Password
            <input
              type="password"
              name="emp-login"
              value={formData.password}
              onChange={(e) => handleChange(e, 'password')}
            />
          </label>
          <br/>
          <label htmlFor="employee-name">
            Name
            <input
              type="text"
              name="emp-login"
              value={formData.name}
              onChange={(e) => handleChange(e, 'name')}
            />
          </label>
          <br/>
          <label htmlFor="employee-phone">
            Phone
            <input
              type="number"
              name="emp-login"
              value={formData.phone}
              onChange={(e) => handleChange(e, 'phone')}
            />
          </label>
          <br/>
          <label htmlFor="employee-secret">
            Authentication Password
            <input
              type="password"
              name="emp-login"
              value={formData.authPassword}
              onChange={(e) => handleChange(e, 'authPassword')}
            />
          </label>
          <button type="submit" 
          onClick={(e) => createEmployee(e)} >
            Create New Employee
          </button>
          </form>
          <h3>
            {isAuth ? null : "You have entered the wrong authentication password"}
          </h3>
          <h3>
            {empCreated ? (
              creationError ? "Employee with this ID is already created": "Employee Created"
             ) : null  }
          </h3>
      </div>
  )
};

export default RegisterEmployee;