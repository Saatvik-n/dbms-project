import React, { useState, useEffect } from 'react';
import { CURRENT_MONTH, CURRENT_YEAR } from '../../../CurrentDate';
import MeterUsage from '../../../Components/Customer/MeterUsage';
import PayBill from '../../../Components/Customer/PayBill';
import { useLocation } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import { insertBill, checkHasPaid } from '../../../DBHandler/CustomerFunctions';
import Navigation from '../../../Components/Navbar/Navigation';

const getCustomerID = (url: string): string => {
  let re = new RegExp('/bills/', 'g');
  let custID = url.replace(re, '').trim();

  return custID;
};

const Bills = () => {
  const [showUsage, setShowUsage] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const location = useLocation();
  const [total, setTotal] = useState(0);
  const [transactionID, settransactionID] = useState('');
  const [hasSubmit, setHasSubmit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [blockPay, setBlockPay] = useState(false);

  useEffect(() => {
    checkHasPaid(getCustomerID(location.pathname))
      .then((result) => {
        setBlockPay(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const changeTransHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    settransactionID(e.target.value);
  };

  const submitBill = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    insertBill(transactionID, getCustomerID(location.pathname), total)
      .then((result) => {
        setHasSubmit(result);
        setIsError(!result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (hasSubmit) {
    return (
      <div>
        <Navigation 
      userLink={`/custhome/${getCustomerID(location.pathname)}`} />
        <h2>You have successfully paid the bill for this month</h2>
      </div>
    );
  }

  return (
    <>
    <Navigation 
      userLink={`/custhome/${getCustomerID(location.pathname)}`} />
      <div>
        <h2 style={{ margin: '10px 0px', textAlign: 'center' }}>
          Generate and pay bills
        </h2>
        <h3 style={{ margin: '10px 0px', textAlign: 'center' }}>
          Current billing cycle is: {CURRENT_MONTH} {CURRENT_YEAR}{' '}
        </h3>
        <hr />
        <Row>
          <Col md={6} className="mx-auto">
            <Button
              block
              onClick={() => {
                setShowUsage(true);
              }}
              style={{ marginBottom: '15px' }}
            >
              See bill for {CURRENT_MONTH} {CURRENT_YEAR}
            </Button>
          </Col>
        </Row>
        {showUsage ? (
          <MeterUsage
            custID={getCustomerID(location.pathname)}
            generateTotal={true}
            priceHandler={setTotal}
          />
        ) : null}
        {/* Make a component to show the current usage. Put a button, 
      Warn the user usage cannot be changed for this month  */}
        {blockPay ? (
          <h3 style={{ marginTop: '10px', textAlign: 'center' }}>
            You have already paid the bill for this month
          </h3>
        ) : (
          <>
            <Row>
              <Col md={6} className="mx-auto">
                <Button
                  block
                  onClick={() => {
                    setShowPay(true);
                    setShowUsage(true);
                  }}
                  style={{ display: showPay ? 'none' : 'block' }}
                >
                  Pay bill for {CURRENT_MONTH} {CURRENT_YEAR}
                </Button>
              </Col>
            </Row>
            {showPay ? (
              <PayBill
                total={total}
                onTransChange={changeTransHandler}
                transID={transactionID}
                submit={submitBill}
              />
            ) : null}
            <h3>
              {isError
                ? 'There is an issue with inserting, please try again'
                : null}
            </h3>
          </>
        )}
      </div>
    </>
  );
};

export default Bills;
