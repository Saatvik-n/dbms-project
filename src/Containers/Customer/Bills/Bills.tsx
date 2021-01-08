import React, { useState, useEffect } from "react"
import {CURRENT_MONTH, CURRENT_YEAR} from "../../../CurrentDate"
import MeterUsage from "../../../Components/Customer/MeterUsage"
import PayBill from "../../../Components/Customer/PayBill"
import {useLocation} from "react-router-dom"
import {insertBill, checkHasPaid} from "../../../DBHandler/CustomerFunctions"

const getCustomerID = (url: string):string => {
  let re = new RegExp('/bills/', 'g');
  let custID = url.replace(re, '').trim();

  return custID;
}

const Bills = () => {

  const [showUsage, setShowUsage] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const location = useLocation();
  const [total, setTotal] = useState(0);
  const [transactionID, settransactionID] = useState("");
  const [hasSubmit, setHasSubmit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [blockPay, setBlockPay] = useState(false);

  useEffect(()=> {
    checkHasPaid(getCustomerID(location.pathname))
    .then(result => {
      setBlockPay(result)
    })
    .catch(err => {
      console.error(err);
    })
  }, [])

  const changeTransHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    settransactionID(e.target.value);
  }

  const submitBill = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    insertBill(transactionID, getCustomerID(location.pathname), total)
    .then(result => {
      setHasSubmit(result);
      setIsError(!result)
    })
    .catch(err =>{
      console.error(err);

    })
  }

  const PayBillComponent: React.FC = () => (
    <>
      <h3 style={{
        color:"blue", 
        textDecoration: "underline", 
        cursor: "pointer"
      }}
      onClick={(e) => {setShowPay(true); setShowUsage(true)}} >Pay bill for {CURRENT_MONTH} {CURRENT_YEAR} </h3>
      {showPay ? (
        <PayBill total={total}
        onTransChange={changeTransHandler}
        transID={transactionID}
        submit={submitBill} />
      ): null }
      <h3>
        {isError ? "There is an issue with inserting, please try again" : null}
      </h3>
    </>
  )


  if (hasSubmit) {
    return (
      <div>
        <h2>You have successfully paid the bill for this month</h2>
      </div>
    )
  }

  return (
    <div>
      <h2>Generate and pay bills</h2>
      <h3>Current billing cycle is: {CURRENT_MONTH} {CURRENT_YEAR} </h3>
      <hr/>
      <h3 style={{
        color:"blue", 
        textDecoration: (showUsage ? "none" : "underline"), 
        cursor: "pointer"
      }}
      onClick={(e) => setShowUsage(true)} >See Bill for {CURRENT_MONTH} {CURRENT_YEAR}  </h3>
      {showUsage ? (
        <MeterUsage custID={getCustomerID(location.pathname)}
        generateTotal={true}
        priceHandler={setTotal} />
      ) : null}
      {/* Make a component to show the current usage. Put a button, 
      Warn the user usage cannot be changed for this month  */}
      {blockPay ? (
        <h3>You have already paid the bill for this month</h3>
      )
        :
        PayBillComponent
      }
    </div>
  )
}

export default Bills;