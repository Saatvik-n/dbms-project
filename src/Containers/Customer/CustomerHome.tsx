import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom"

import Meters from "../../Components/Customer/Meters"

import { getCustomerName } from "../../DBHandler/CustomerFunctions"

const getCustomerID = (url: string):string => {
    let re = new RegExp('/custhome/', 'g');
    let custID = url.replace(re, '').trim();

    return custID;
}

const CustomerHome: React.FC = () => {

    const [loading, setLoading] = useState(true);
    const [customerID, setCustomerID] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [isError, setIsError] = useState(false);
    const currentUrl = useLocation();

    useEffect(() => {
        getCustomerName(getCustomerID(currentUrl.pathname)).then(result => {
            setCustomerID(getCustomerID(currentUrl.pathname))
            setCustomerName(result)
            setLoading(false)
        })
        .catch(err => {
            console.log(err);
            setIsError(true)
        })
    }, [])


    if (loading) {
        return (
            <div>
                <h2>{isError ? "Error " : "Loading ..."} </h2>
            </div>
        )
    }

    return (
        <div>
            <h2>
                Welcome {customerName}
            </h2>
            <h3>Your current meters</h3>
            <Meters customerID={customerID} />
            <h3> <Link to={`/addmeters/${customerID}`}> Add meters </Link> </h3>
            <h3> <Link to={`/usage/${customerID}`}> See and Update Usage </Link> </h3>
            <h3> Pay bill </h3>

        </div>
    )
}
export default CustomerHome;