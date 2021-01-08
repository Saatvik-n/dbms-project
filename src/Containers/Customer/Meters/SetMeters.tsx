import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getCustomerMeters,
  updateUsage,
} from '../../../DBHandler/CustomerFunctions';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

const getCustomerID = (url: string): string => {
  let re = new RegExp('/setmeters/', 'g');
  let custID = url.replace(re, '').trim();

  return custID;
};

const SetMeters = () => {
  const [meterData, setMeterData] = useState<any[]>([]); // meter data such as id, name, rate
  const [usageData, setUsageData] = useState<string[]>([]); //array of new values to set the usage of meters
  const [showModal, setShowModal] = useState(false); // modal to show on pressing button
  const [error, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    getCustomerMeters(getCustomerID(location.pathname))
      .then((result) => {
        setMeterData(result);
        let tempArray = new Array(result.length).fill('');
        setUsageData(tempArray);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = e.target.value;
    let newArray = usageData.slice();
    newArray[index] = newValue;
    setUsageData(newArray);
  };

  const submitUsage = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    const meterArray = meterData.map((row) => row[0]); //array of meter IDs, so their usages can be updated
    updateUsage(usageData, meterArray)
      .then((result) => {
        console.log(`Result of updating usage is: ${result}`);
        setShowModal(true);
        setError(!result);
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      });
  };

  return (
    <Container fluid>
      <h3 style={{margin: "15px 0px", textAlign: "center"}} >
        {showModal
          ? error
            ? 'Error in making change'
            : 'Usage changed successfully'
          : null}
      </h3>
      <Row>
        <Col md={8} className="mx-auto">
        <Table striped bordered >
        <thead>
          <tr>
            <th>Meter ID</th>
            <th>Meter Name</th>
            <th>Meter Rate</th>
            <th>Meter Usage</th>
          </tr>
        </thead>
        <tbody>
          {meterData.map((row, index) => {
            return (
              <tr key={index}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>
                  <input
                    type="number"
                    name="usage-input"
                    id=""
                    value={usageData[index]}
                    onChange={(e) => changeHandler(e, index)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
        </Col>
      </Row>
      <Row>
        <Col md={4} className="mx-auto">
        <Button variant="success" 
        onClick={(e) => submitUsage(e)}
        block > Set Values </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SetMeters;
