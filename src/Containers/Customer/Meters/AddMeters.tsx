import React, { useState } from 'react';
import {useLocation} from "react-router-dom"
import { addMeter } from '../../../DBHandler/CustomerFunctions';

interface fdata {
  [index: string]: string;
}

let initialObject: fdata = {
  meterID: '',
  meterName: '',
  meterRate: '',
};

const getCustomerID = (url: string):string => {
    let re = new RegExp('/addmeters/', 'g');
    let custID = url.replace(re, '').trim();

    return custID;
}

const AddMeters = () => {
  console.log('Add meters custID = ');

  const [formData, setFormData] = useState(initialObject);
  const [addComplete, setAddComplete] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const currentURL = useLocation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    toChange: string
  ) => {
    let newFormData = { ...formData };
    switch (toChange) {
      case 'id':
        newFormData.meterID = e.target.value;
        setFormData(newFormData);
        break;
      case 'name':
        newFormData.meterName = e.target.value;
        setFormData(newFormData);
        break;
      case 'rate':
        newFormData.meterRate = e.target.value;
        setFormData(newFormData);
        break;
      default:
        break;
    }
  };

  const addGivenMeter = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    for (const prop in formData) {
      if (formData[prop].trim() === '') {
        setShowModal(true);
        return;
      }
    }
    setShowModal(false);
    addMeter(
      getCustomerID(currentURL.pathname),
      formData.meterID,
      formData.meterName,
      +formData.meterRate
    )
      .then((result) => {
        setAddComplete(true);
        if (result === false) {
          setIsError(true);
        } else {
          setIsError(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setAddComplete(true);
        setIsError(true);
      });
  };

  return (
    <div>
      <h2>Add meters</h2>
      <h2>{showModal ? 'Every input field must be filled' : null}</h2>
      <form>
        <label htmlFor="meter-id">
          Enter Meter ID
          <input
            type="text"
            name="meter-add"
            id=""
            value={formData.meterID}
            onChange={(e) => handleChange(e, 'id')}
          />
        </label>
        <br />
        <label htmlFor="meter-name">
          Enter Meter Name
          <input
            type="text"
            name="meter-add"
            id=""
            value={formData.meterName}
            onChange={(e) => handleChange(e, 'name')}
          />
        </label>
        <br />
        <label htmlFor="meter-rate">
          Enter Meter Rate
          <input
            type="number"
            name="meter-add"
            id=""
            value={formData.meterRate}
            onChange={(e) => handleChange(e, 'rate')}
          />
        </label>
        <br />
        <button type="submit" onClick={(e) => addGivenMeter(e)}>
          Add meter
        </button>
      </form>
      <h3>
        {addComplete
          ? isError
            ? 'Meter with this ID is already created'
            : 'Meter created'
          : null}
      </h3>
    </div>
  );
};

export default AddMeters;
