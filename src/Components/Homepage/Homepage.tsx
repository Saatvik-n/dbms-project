import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {useHistory} from "react-router-dom"

const Homepage = () => {
  const history = useHistory()

  return (
    <Container fluid>
      <h1 style={{ textAlign: 'center' }}>Water Supply Board</h1>
      <Row style={{marginTop: "30px"}} >
        <Col md={6}>
          <Button variant="primary" size="lg" block 
          onClick={(e) => history.push('/custlogin')} >
            Customer Login
          </Button>
          <h4 style={{marginTop: "20px", textAlign: "center"}} >
            <Link to="/custreg"> Register Customer </Link>
          </h4>
        </Col>
        <Col md={6}>
          <Button variant="primary" size="lg" block 
          onClick={(e) => history.push('/emplogin')} >
            Employee Login
          </Button>
          <h4 style={{marginTop: "20px", textAlign: "center"}} >
            <Link to="/empreg"> Register Employee </Link>
          </h4>
        </Col>
      </Row>
      {/* <h3
        style={{
          margin: '10px',
        }}
      >
        <Link to="/emplogin">Employee Login</Link>
      </h3>
      <h3>
        <Link to="/custlogin"> Customer Login </Link>
      </h3>

      <h3>
        <Link to="/custreg"> Register Customer </Link>
      </h3> */}
    </Container>
  );
};

export default Homepage;
