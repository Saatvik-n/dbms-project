import React, { useState, useEffect } from 'react';
import { getCustomerMeters } from '../../DBHandler/CustomerFunctions';
import { Card, Table, Row, Col } from 'react-bootstrap';

const Meters = (props: any) => {
  const [customerMeters, setCustomerMeters] = useState<string[]>([]);

  useEffect(() => {
    getCustomerMeters(props.customerID)
      .then((result) => {
        console.log(result);
        setCustomerMeters(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <Row>
        <Col md={8} className="mx-auto">
          <Card>
            <Card.Body>
              <Card.Title> Your current meters </Card.Title>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Meter ID</th>
                    <th>Meter Name</th>
                    <th>Meter Rate</th>
                  </tr>
                </thead>

                <tbody>
                  {customerMeters.map((row, index) => {
                    return (
                      <tr key={index}>
                        <td> {row[0]} </td>
                        <td> {row[1]} </td>
                        <td> {row[2]} </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Meters;
