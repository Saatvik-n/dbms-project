import React from "react";
import MeterUsage from "../../../Components/Customer/MeterUsage"
import {useLocation, useHistory} from "react-router-dom"
import {CURRENT_MONTH, CURRENT_YEAR} from "../../../CurrentDate"
import {Button, Col, Row} from "react-bootstrap"

const getCustomerID = (url: string):string => {
    let re = new RegExp('/usage/', 'g');
    let custID = url.replace(re, '').trim();

    return custID;
}

const Usage = () => {
    const location = useLocation();
    const history = useHistory();
    return (
        <div>
            <h2 style={{margin: "15px 0px", textAlign: "center"}} >Usage for: {CURRENT_MONTH} {CURRENT_YEAR} </h2>
            <MeterUsage custID={getCustomerID(location.pathname)}  /> 
            {/* This is just a static component for display*/}
            <Row style={{marginTop: "15px"}} >
                <Col md={4} className="mx-auto">
                    <Button block 
                    onClick={() => history.push(`/setmeters/${getCustomerID(location.pathname)}`)} > Set Meter Usage </Button>
                </Col>
            </Row>
        </div>
    )
}

export default Usage;