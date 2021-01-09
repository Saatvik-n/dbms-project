import React, { useState } from 'react';
import { createNewCustomer } from '../../DBHandler/CustomerFunctions';
import { Row, Col, Form, Container, Button } from 'react-bootstrap';

interface fdata {
  [index: string]: string;
}

let initialObject: fdata = {
  custID: '',
  password: '',
  name: '',
  city: '',
  street: '',
  phone: ''
};

const RegisterCustomer: React.FC = () => {
  const [formData, setFormData] = useState(initialObject);
  const [custCreated, setcustCreated] = useState(false);
  const [creationError, setCreationError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (
    event: any,
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
      case 'street':
        newFormData.street = event.target.value.trim();
        setFormData(newFormData);
        break;
      case 'phone':
        newFormData.phone = event.target.value.trim();
        setFormData(newFormData);
        break;
      default:
        break;
    }
  };

  const createCustomer = (
    event: any
  ) => {
    event.preventDefault();
    for (const prop in formData) {
      if (formData[prop].trim() === '') {
        setShowModal(true);
        return;
      }
    }
    setShowModal(false);
    createNewCustomer(
      formData.custID,
      formData.password,
      formData.name,
      formData.city, 
      formData.street, 
      formData.phone
    )
      .then((result) => {
        setcustCreated(true);
        if (result === false) {
          setCreationError(true);
        } else {
          setCreationError(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setcustCreated(true);
        setCreationError(true);
      });
  };

  return (
    <Container fluid>
      <h1 style={{textAlign: "center"}} >Register a new customer</h1>
      <h4 style={{color: "red", margin: "15px 0px"}} >{showModal ? 'Every input field should be filled' : null}</h4>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="cust-id">
            <Form.Label>
              Customer ID
            </Form.Label>
            <Form.Control type="text" placeholder="Customer ID"
            value={formData.custID}
            onChange={(e) => handleChange(e, 'custID')} />
            </Form.Group>
            <Form.Group controlId="cust-pwd">
            <Form.Label>
              Password
            </Form.Label>
            <Form.Control type="password"
            value={formData.password}
            onChange={(e) => handleChange(e, 'password')} />
            </Form.Group>
            <Form.Group controlId="cust-name">
            <Form.Label>
              Name
            </Form.Label>
            <Form.Control type="text" placeholder="Your Name"
            value={formData.name}
            onChange={(e) => handleChange(e, 'name')} />
            </Form.Group>
            <Form.Group controlId="cust-id">
            <Form.Label>
              City
            </Form.Label>
            <Form.Control type="text" placeholder="City"
            value={formData.city}
            onChange={(e) => handleChange(e, 'city')} />
            </Form.Group>
            <Form.Group controlId="cust-street">
            <Form.Label>
              Street
            </Form.Label>
            <Form.Control type="text" placeholder="street"
            value={formData.street}
            onChange={(e) => handleChange(e, 'street')} />
            </Form.Group>
            <Form.Group controlId="cust-phone">
            <Form.Label>
              Phone
            </Form.Label>
            <Form.Control type="number" placeholder="10 digit phone number"
            value={formData.phone}
            onChange={(e) => handleChange(e, 'phone')} />
            </Form.Group>
            <Button variant="success"
            onClick={(e) => createCustomer(e)} >
              Create New Customer
            </Button>
          </Form>
        </Col>
      </Row>
      <h4 style={{margin: "15px 0px"}} >
        {custCreated
          ? creationError
            ? 'Customer with this ID is already created'
            : 'Customer Created'
          : null}
      </h4>
    </Container>
  );
};

export default RegisterCustomer;
