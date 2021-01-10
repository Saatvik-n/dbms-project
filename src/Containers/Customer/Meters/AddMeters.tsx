import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { addMeter } from '../../../DBHandler/CustomerFunctions';
import { Button, Row, Col, Form, Container } from 'react-bootstrap';
import Navigation from "../../../Components/Navbar/Navigation"


interface fdata {
  [index: string]: string;
}

let initialObject: fdata = {
  meterID: '',
  meterName: '',
  meterRate: '',
};

const getCustomerID = (url: string): string => {
  let re = new RegExp('/addmeters/', 'g');
  let custID = url.replace(re, '').trim();

  return custID;
};

const AddMeters = () => {
  const [formData, setFormData] = useState(initialObject);
  const [addComplete, setAddComplete] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const currentURL = useLocation();

  const handleChange = (
    e: any,
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

  const addGivenMeter = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
    <>
    <Navigation 
      userLink={`/custhome/${getCustomerID(currentURL.pathname)}`} />
    <Container fluid>
      <h2 style={{ margin: '15px 0px', textAlign: 'center' }}>
        Add new Meters
      </h2>
      <h4 style={{ color: 'red' }}>
        {showModal ? 'Every input field must be filled' : null}
      </h4>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="meter-id">
              <Form.Label> New Meter ID </Form.Label>
              <Form.Control
                type="text"
                placeholder="meter ID"
                value={formData.meterID}
                onChange={(e) => handleChange(e, 'id')}
              />
            </Form.Group>
            <Form.Group controlId="meter-name">
              <Form.Label> New Meter Name </Form.Label>
              <Form.Control
                type="text"
                value={formData.meterName}
                onChange={(e) => handleChange(e, 'name')}
              />
            </Form.Group>
            <Form.Group controlId="meter-rate">
              <Form.Label> New Meter Rate </Form.Label>
              <Form.Control
                type="number"
                value={formData.meterRate}
                onChange={(e) => handleChange(e, 'rate')}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => addGivenMeter(e)}
            >
              Add meter
            </Button>
          </Form>
        </Col>
      </Row>
      <form></form>
      <h3 style={{marginTop: "10px"}} >
        {addComplete
          ? isError
            ? 'Meter with this ID is already created'
            : 'Meter created'
          : null}
      </h3>
    </Container>
    </>
  );
};

export default AddMeters;
