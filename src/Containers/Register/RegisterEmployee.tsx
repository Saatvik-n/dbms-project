import React, { useState } from 'react';
import { createNewEmployee } from '../../DBHandler/EmployeeFunctions';
import { Row, Col, Form, Container, Button } from 'react-bootstrap';

interface fdata {
  [index: string]: string;
}

let initialObject: fdata = {
  empID: '',
  password: '',
  name: '',
  phone: '',
  city: '',
  authPassword: '',
};

const RegisterEmployee: React.FC = () => {
  const [formData, setFormData] = useState(initialObject);
  const [empCreated, setEmpCreated] = useState(false);
  const [creationError, setCreationError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAuth, setIsAuth] = useState(true);

  const handleChange = (event: any, toChange: string) => {
    let newFormData = {
      ...formData,
    };
    switch (toChange) {
      case 'empID':
        newFormData.empID = event.target.value.trim();
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
      case 'phone':
        newFormData.phone = event.target.value.trim();
        setFormData(newFormData);
        break;
      case 'city':
        newFormData.city = event.target.value.trim();
        setFormData(newFormData);
        break;
      case 'authPassword':
        newFormData.authPassword = event.target.value.trim();
        setFormData(newFormData);
        break;
      default:
        break;
    }
  };

  const createEmployee = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
    createNewEmployee(
      formData.empID,
      formData.password,
      formData.name,
      formData.phone, 
      formData.city
    )
      .then((result) => {
        console.log(result);
        setEmpCreated(true);
        if (result === false) {
          setCreationError(true);
        } else {
          setCreationError(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setCreationError(true);
      });
  };

  return (
    <Container fluid>
      <h1>Register a new employee</h1>
      <h4 style={{ color: 'red', margin: '15px 0px' }}>
        {showModal ? 'Every input field should be filled' : null}
      </h4>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="emp-id">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Employee ID"
                value={formData.empID}
                onChange={(e) => handleChange(e, 'empID')}
              />
            </Form.Group>
            <Form.Group controlId="emp-pwd">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={(e) => handleChange(e, 'password')}
              />
            </Form.Group>
            <Form.Group controlId="emp-name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => handleChange(e, 'name')}
              />
            </Form.Group>
            <Form.Group controlId="emp-phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => handleChange(e, 'phone')}
              />
            </Form.Group>
            <Form.Group controlId="emp-city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => handleChange(e, 'city')}
              />
            </Form.Group>
            <Form.Group controlId="emp-auth">
              <Form.Label>Authentication password</Form.Label>
              <Form.Control
                type="password"
                value={formData.authPassword}
                onChange={(e) => handleChange(e, 'authPassword')}
              />
            </Form.Group>
            <Button variant="success" onClick={(e) => createEmployee(e)}>
              Create New Customer
            </Button>
          </Form>
        </Col>
      </Row>
      <h4 style={{ color: 'red', margin: '15px 0px' }}>
        {isAuth ? null : 'You have entered the wrong authentication password'}
      </h4>
      <h4>
        {empCreated
          ? creationError
            ? 'Employee with this ID is already created'
            : 'Employee Created'
          : null}
      </h4>
    </Container>
  );
};

export default RegisterEmployee;
