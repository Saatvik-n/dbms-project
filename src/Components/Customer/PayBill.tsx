import React from "react"
import {Row, Col, Form, Button} from "react-bootstrap"

const PayBill = (props:any) => {

  return (
    <Row>
      <Col md={6} className="mx-auto">
      <h3 style={{color: "red"}} >
        AFTER PAYING BILL, YOU WILL NOT BE ABLE TO CHANGE USAGE
      </h3>
      <Form>
        <Form.Group controlId="trans-id">
          <Form.Label>
            Transaction ID
          </Form.Label>
          <Form.Control type="text" value={props.transID}
          onChange={props.onTransChange} />
          <Form.Text>
            Total = {props.total}
          </Form.Text>
        </Form.Group>
        <Button size="lg" 
        onClick={(e) => props.submit(e)}
        variant="success" >
          Pay Bill
        </Button>
      </Form>
      </Col>
    </Row>
  )
}

export default PayBill;