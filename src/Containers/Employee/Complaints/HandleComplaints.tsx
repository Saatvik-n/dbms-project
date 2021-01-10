import React, {useState, useEffect} from "react"
import {useLocation} from "react-router-dom"
import {Container, Row, Col, Button} from "react-bootstrap"
import EmpComplaints from "../../../Components/Employee/EmpComplaints"
import {getComplaints, updateComplaints} from "../../../DBHandler/EmployeeFunctions"
import Navigation from "../../../Components/Navbar/Navigation"

const getEmpID = (url: string):string => {
  let re = new RegExp('/handle/', 'g');
  let empID = url.replace(re, '').trim();

  return empID;
}

const getComplaintIDs = (complaints: string[], checked: boolean[]):string[] => {
  let toUpdate:string[] = []
  for (let i = 0; i < complaints.length; i++) {
    const ID = complaints[i][0];
    if (checked[i] === true) {
      toUpdate.push(ID)
    }
  }

  return toUpdate;
}

const HandleComplaints = () => {

  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [empID, setEmpID] = useState("")
  const [fixed, setFixed] = useState<boolean[]>([]) //to keep track of which checkboxes are selected, and which are not
  const [complaints, setComplaints] = useState<string[]>([])
  const [hasSubmit, setHasSubmit] = useState(false);

  useEffect(() => {
    console.log(getEmpID(location.pathname));
    getComplaints(getEmpID(location.pathname))
    .then(result => {
      console.log(result);
      setComplaints(result)
      setFixed(new Array(result.length).fill(false))
      setEmpID(getEmpID(location.pathname))
      setLoading(false)
    })
    .catch(err => {
      console.error(err);
    })
  }, [])

  const handleSubmit = () => {
    let IDs = getComplaintIDs(complaints, fixed)
    updateComplaints(IDs, empID)
    .then(result => {
      setHasSubmit(result)
    })
    .catch(err => {
      console.error(err);
    })
  }

  const handleCheckChange = (i: number) => {
    let newCopy = [...fixed]
    newCopy[i] = !fixed[i]
    setFixed(newCopy)
  }

  if (loading) {
    return (
      <h2>Loading ...</h2>
    ) 
  }

  if (hasSubmit) {
    return (
      <>
        <Navigation userLink={`/emphome/${empID}`} />
        <h2 style={{ textAlign: 'center' }}>You have submitted the changes</h2>
      </>
    )
  }

  return (
    <>
    <Navigation 
      userLink={`/emphome/${empID}`} />
    <Container>
      <h2 style={{textAlign: "center"}} > Handle complaints </h2>
      <EmpComplaints 
      complaints={complaints}
      fixed={fixed}
      handleCheckChange={handleCheckChange} />
      <Row>
        <Col md={6} className="mx-auto">
          <Button block 
          onClick={() => handleSubmit()} >
            Submit Form
          </Button>
        </Col>  
      </Row>
    </Container>
    </>
  )
}

export default HandleComplaints;