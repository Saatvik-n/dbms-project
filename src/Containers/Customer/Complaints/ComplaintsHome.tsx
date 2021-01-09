import React, {useState, useEffect} from "react"
import {Container, Row, Col, Button, Form} from "react-bootstrap"
import {useLocation} from "react-router-dom"
import CurrentComplaints from "../../../Components/Customer/CurrentComplaints"
import {getCustomerComplaints, insertComplaint} from "../../../DBHandler/CustomerFunctions"

const getCustomerID = (url: string):string => {
  let re = new RegExp('/complaints/', 'g');
  let custID = url.replace(re, '').trim();

  return custID;
}

const getPendingComplaints = (complaints: string[]) => {
  let pendingComplaints = []
  for (let i = 0; i < complaints.length; i++) {
    const row = complaints[i];
    if (row[4] === null) {
      pendingComplaints.push(row);
    }
  }
  return pendingComplaints;
}
const getApprovedComplaints = (complaints: string[]) => {
  let pendingComplaints = []
  for (let i = 0; i < complaints.length; i++) {
    const row = complaints[i];
    if (row[4] !== null) {
      pendingComplaints.push(row);
    }
  }
  return pendingComplaints;
}

const ComplaintsHome = () => {

  const location = useLocation();
  const [pendingComplaints, setPendingComplaints] = useState<string[]>([])
  const [approvedComplaints, setApprovedComplaints] = useState<string[]>([])
  const [complaintDesc, setComplaintDesc] = useState("");
  const [addedComplaint, setAddedComplaint] = useState(false);

  useEffect(() => {
    getCustomerComplaints(getCustomerID(location.pathname))
    .then(result => {
      setPendingComplaints(getPendingComplaints(result))
      setApprovedComplaints(getApprovedComplaints(result))
    })
    .catch(err => {
      console.error(err);
    })
  }, [addedComplaint])

  const handleDescChange = (e: any) => {
    const newText = e.target.value;
    setComplaintDesc(newText);
  }

  const addComplaint = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    insertComplaint(getCustomerID(location.pathname), complaintDesc)
    .then(result => {
      console.log(`Result of adding complaint = ${result}`);
      setAddedComplaint(result)
    })
    .catch(err => {
      console.error(err); 
    })
  }


  return (
    <Container fluid>
      <Row style={{margin: "10px 0px"}} >
        <Col md={8} className="mx-auto">
          <h3> Pending Customer Complaints </h3>
          <CurrentComplaints 
          complaints={pendingComplaints}
          isApproved={false} />
        </Col>
      </Row>
      <Row>
        <Col md={8} className="mx-auto">
          <h3>Solved customer complaints</h3>
          <CurrentComplaints 
          complaints={approvedComplaints}
          isApproved={true} />
        </Col>
      </Row>
      {
        addedComplaint ? 
        (
          <Row>
            <Col md={8} className="mx-auto">
              <h3> Complaint Added </h3>
            </Col>
          </Row> 
        )
        : (
          <Row>
              <Col md={8} className="mx-auto">
                <h3>Add complaints here</h3>
                <Form>
                  <Form.Group> Enter the complaint description </Form.Group>
                  <Form.Control type="text" placeholder="complaint description"
                  value={complaintDesc}
                  onChange={(e) => handleDescChange(e)} />
                  <Button size="lg" variant="success" style={{marginTop: "10px"}}
                  onClick={(e) => addComplaint(e)} >
                    Submit complaint
                  </Button>
                </Form>
              </Col>
            </Row>
        )
      }
    </Container>
  )
}

export default ComplaintsHome;