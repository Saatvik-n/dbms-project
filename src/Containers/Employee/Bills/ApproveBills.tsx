import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import EmpBills from '../../../Components/Employee/EmpBills';
import { getBills, updateBills } from '../../../DBHandler/EmployeeFunctions';
import Navigation from '../../../Components/Navbar/Navigation';

const getEmpID = (url: string): string => {
  let re = new RegExp('/approve/', 'g');
  let empID = url.replace(re, '').trim();

  return empID;
};

const getBillIDs = (bills: string[], checked: boolean[]): string[] => {
  let toUpdate: string[] = [];
  for (let i = 0; i < bills.length; i++) {
    const ID = bills[i][0];
    if (checked[i] === true) {
      toUpdate.push(ID);
    }
  }
  return toUpdate;
};

const ApproveBills = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [empID, setEmpID] = useState('');
  const [fixed, setFixed] = useState<boolean[]>([]); //to keep track of which checkboxes are selected, and which are not
  const [bills, setBills] = useState<string[]>([]);
  const [hasSubmit, setHasSubmit] = useState(false);

  useEffect(() => {
    console.log(getEmpID(location.pathname));
    getBills(getEmpID(location.pathname))
      .then((result) => {
        console.log(result);
        setBills(result);
        setFixed(new Array(result.length).fill(false));
        setEmpID(getEmpID(location.pathname));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleCheckChange = (i: number) => {
    let newCopy = [...fixed];
    newCopy[i] = !fixed[i];
    setFixed(newCopy);
  };

  const handleSubmit = () => {
    let IDs = getBillIDs(bills, fixed);
    updateBills(IDs, empID)
      .then((result) => {
        setHasSubmit(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (loading) {
    return <h2>Loading ...</h2>;
  }

  if (hasSubmit) {
    return (
      <>
        <Navigation userLink={`/emphome/${empID}`} />
        <h2 style={{ textAlign: 'center' }}>You have submitted the changes</h2>
      </>
    );
  }

  return (
    <>
      <Navigation userLink={`/emphome/${empID}`} />
      <Container>
        <h2 style={{ textAlign: 'center' }}> Approve Bills </h2>
        <EmpBills
          bills={bills}
          fixed={fixed}
          handleCheckChange={handleCheckChange}
        />
        <Row>
          <Col md={6} className="mx-auto">
            <Button block onClick={() => handleSubmit()}>
              Submit Form
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ApproveBills;
