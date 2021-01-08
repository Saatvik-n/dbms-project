import React from "react";
import MeterUsage from "../../../Components/Customer/MeterUsage"
import {useLocation, Link} from "react-router-dom"
import {CURRENT_MONTH, CURRENT_YEAR} from "../../../CurrentDate"

const getCustomerID = (url: string):string => {
    let re = new RegExp('/usage/', 'g');
    let custID = url.replace(re, '').trim();

    return custID;
}

const Usage = () => {
    const location = useLocation();
    return (
        <div>
            <h2>Usage for: {CURRENT_MONTH} {CURRENT_YEAR} </h2>
            <MeterUsage custID={getCustomerID(location.pathname)}  /> 
            {/* This is just a static component for display*/}
            <h2> <Link to={`/setmeters/${getCustomerID(location.pathname)}`}> Set or update meter usage </Link> </h2>
        </div>
    )
}

export default Usage;