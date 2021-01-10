import React, {useState, useEffect} from 'react';
import MeterUsage from '../../../Components/Customer/MeterUsage';
import { useLocation, useHistory } from 'react-router-dom';
import { CURRENT_MONTH, CURRENT_YEAR } from '../../../CurrentDate';
import { Button, Col, Row } from 'react-bootstrap';
import Navigation from '../../../Components/Navbar/Navigation';
import {isBillPaid} from "../../../DBHandler/CustomerFunctions"

const getCustomerID = (url: string): string => {
  let re = new RegExp('/usage/', 'g');
  let custID = url.replace(re, '').trim();

  return custID;
};

const Usage = () => {
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    isBillPaid(getCustomerID(location.pathname))
    .then(result => {
      setShowButton(result)
      setLoading(false)
    })
    .catch(err => {
      console.error(err);
    })
  }, [])


  if (loading) {
    return (
      <h2>Loading ...</h2>
    )
  }

  return (
    <>
        <Navigation 
      userLink={`/custhome/${getCustomerID(location.pathname)}`} />
      <div>
        <h2 style={{ margin: '15px 0px', textAlign: 'center' }}>
          Usage for: {CURRENT_MONTH} {CURRENT_YEAR}
        </h2>
        <MeterUsage custID={getCustomerID(location.pathname)} />
        {/* This is just a static component for display*/}
        {
          showButton ? (
            <h3 style={{textAlign: "center"}}> You have already paid the bill for this month </h3>
          ) :
          (
            <Row style={{ marginTop: '15px' }}>
          <Col md={4} className="mx-auto">
            <Button
              block
              onClick={() =>
                history.push(`/setmeters/${getCustomerID(location.pathname)}`)
              }
            >
              Set Meter Usage
            </Button>
          </Col>
        </Row>
          )
        }
        
      </div>
    </>
  );
};

export default Usage;
