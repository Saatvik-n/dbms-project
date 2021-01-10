import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navigation from "../../Components/Navbar/Navigation"
import Meters from '../../Components/Customer/Meters';

import { getCustomerName } from '../../DBHandler/CustomerFunctions';

const getCustomerID = (url: string): string => {
  let re = new RegExp('/custhome/', 'g');
  let custID = url.replace(re, '').trim();

  return custID;
};

const CustomerHome: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [customerID, setCustomerID] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isError, setIsError] = useState(false);
  const currentUrl = useLocation();

  useEffect(() => {
    getCustomerName(getCustomerID(currentUrl.pathname))
      .then((result) => {
        setCustomerID(getCustomerID(currentUrl.pathname));
        setCustomerName(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <h2>{isError ? 'Error ' : 'Loading ...'} </h2>
      </div>
    );
  }
  return (
    <div>
      <Navigation 
      userLink={`/custhome/${customerID}`} />
      <h2 style={{ margin: '20px 0px', textAlign: 'center' }}>
        Welcome {customerName}
      </h2>
      <Meters customerID={customerID} />
      <div style={{ margin: '15px 15px', padding: '10px' }}>
        <h3>Functions</h3>
        <h4>
          &#8226;
          <Link to={`/addmeters/${customerID}`}> Add meters </Link>
        </h4>
        <h4>
          &#8226;
          <Link to={`/usage/${customerID}`}> See and Update Usage </Link>
        </h4>
        <h4>
          &#8226;
          <Link to={`/bills/${customerID}`}> Generate and pay bill </Link>
        </h4>
        <h4>
          &#8226; {" "}
          <Link to={`/billstatus/${customerID}`}>
            See approved/pending bills
          </Link>
        </h4>
        <h4>
          &#8226; {" "}
          <Link to={`/complaints/${customerID}`}>
            See and add complaints
          </Link>
        </h4>
      </div>
    </div>
  );
};
export default CustomerHome;
