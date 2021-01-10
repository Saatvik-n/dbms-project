import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { loginEmployee } from '../../DBHandler/EmployeeFunctions';
import { useHistory } from 'react-router-dom';
import Navigation from "../../Components/Navbar/Navigation"


const EmployeeLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    empID: '',
    password: '',
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  const history = useHistory();

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

  const onSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    loginEmployee(formData.empID.trim(), formData.password.trim())
      .then((result) => {
        if (result === true) {
          history.push(`/emphome/${formData.empID.trim()}`)
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
    <>
    <Navigation />
    <Container fluid>
      <h1>Employee Login</h1>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="customer-id">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Employee ID"
                value={formData.empID}
              onChange={onEmpIDChange}
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
    </>
  );
};

export default EmployeeLogin;
