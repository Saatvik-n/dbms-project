import React, { useState } from 'react';
import { createNewCustomer } from "../../DBHandler/CustomerFunctions"

interface fdata {
  [index: string]: string;
}

let initialObject: fdata = {
  custID: '',
  password: '',
  name: '',
  city: '',
};

const RegisterCustomer: React.FC = () => {
  const [formData, setFormData] = useState(initialObject);
  const [custCreated, setcustCreated] = useState(false);
  const [creationError, setCreationError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    toChange: string
  ) => {
    let newFormData = {
      ...formData,
    };
    switch (toChange) {
      case 'custID':
        newFormData.custID = event.target.value.trim();
        setFormData(newFormData);
        break;
      case 'password':
        newFormData.password = event.target.value.trim();
        setFormData(newFormData);
        break;
      case 'name':
        newFormData.name = event.target.value.trim();
        setFormData(newFormData);
        break;
      case 'city':
        newFormData.city = event.target.value.trim();
        setFormData(newFormData);
        break;
      default:
        break;
    }
  };

  const createCustomer = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    for (const prop in formData) {
      if (formData[prop].trim() === '') {
        setShowModal(true);
        return;
      }
    }
    setShowModal(false);
    createNewCustomer(formData.custID, formData.password, formData.name, formData.city)
    .then(result => {
      setcustCreated(true);
      if (result === false) {
        setCreationError(true);
      }
      else {
        setCreationError(false);
      }
    })
    .catch(err => {
      console.error(err);
      setcustCreated(true);
      setCreationError(true);
    })
  }

  return (
    <div>
      <h1>Register a new customer</h1>
      <h3>{showModal ? 'Every input field should be filled' : null}</h3>
      <form>
        <label htmlFor="customer-id">
          Customer ID
          <input
            type="text"
            name="emp-login"
            value={formData.custID}
            onChange={(e) => handleChange(e, 'custID')}
          />
        </label>
        <br />
        <label htmlFor="customer-pwd">
          Password
          <input
            type="password"
            name="emp-login"
            value={formData.password}
            onChange={(e) => handleChange(e, 'password')}
          />
        </label>
        <br />
        <label htmlFor="customer-name">
          Name
          <input
            type="text"
            name="emp-login"
            value={formData.name}
            onChange={(e) => handleChange(e, 'name')}
          />
        </label>
        <br />
        <label htmlFor="customer-city">
          City
          <input
            type="text"
            name="emp-login"
            value={formData.city}
            onChange={(e) => handleChange(e, 'city')}
          />
        </label>
        <br/>
        <button type="submit" onClick={(e) => createCustomer(e)}>
          Create New Customer
        </button>
      </form>
      <h3>
        {custCreated
          ? creationError
            ? 'Customer with this ID is already created'
            : 'Customer Created'
          : null}
      </h3>
    </div>
  );
};

export default RegisterCustomer;