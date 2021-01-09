import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { getEmployeeName } from '../../DBHandler/EmployeeFunctions';

const getEmployeeID = (url: string): string => {
  let re = new RegExp('/emphome/', 'g');
  let empID = url.replace(re, '').trim();

  return empID;
};

const EmployeeHome = () => {
  const [empID, setEmpID] = useState('')
  const [employeeName, setEmployeeName] = useState('');
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    getEmployeeName(getEmployeeID(location.pathname))
      .then((result) => {
        setEmpID(getEmployeeID(location.pathname))
        setEmployeeName(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Container fluid>
      <h2 style={{ margin: '10px 0px', textAlign: 'center' }}>
        Welcome {employeeName}
      </h2>
      <Row>
        <Col md={6}>
          <Button block 
          onClick={() => history.push(`/handle/${empID}`)} >Handle Complaints</Button>
        </Col>
        <Col md={6}>
          <Button block
          onClick={() => history.push(`/approve/${empID}`)} >Approve Bills</Button>
        </Col>
      </Row>
    </Container>
  );
};
export default EmployeeHome;
