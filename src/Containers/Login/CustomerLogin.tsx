import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginCustomer } from '../../DBHandler/CustomerFunctions';
import { Button, Row, Col, Form, Container } from 'react-bootstrap';

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

  const onSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    loginCustomer(formData.custID.trim(), formData.password.trim())
      .then((result) => {
        console.log(formData.custID.trim(), formData.password.trim());
        console.log(`result = ${result}`);
        if (result === true) {
          history.push(`/custhome/${formData.custID}`);
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
      <Container fluid>
      <h1>Customer Login</h1>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="customer-id">
              <Form.Label>Customer ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="customer ID"
                value={formData.custID}
                onChange={oncustIDChange}
              />
            </Form.Group>
            <Form.Group controlId="customer-pwd">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={onPasswordChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit"
            onClick={(e) => onSubmit(e)} >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
      {buttonPressed ? (
        <h2>{loggedIn ? 'Logged In successfully' : 'Login failed'}</h2>
      ) : null}
      </Container>
  );
};

export default CustomerLogin;
