import React, {useState, useEffect} from "react"
import BillPending from "../../../Components/Customer/BillPending"
import {getCustomerBills} from "../../../DBHandler/CustomerFunctions"
import {useLocation} from "react-router-dom"

const getCustomerID = (url: string):string => {
  let re = new RegExp('/billstatus/', 'g');
  let custID = url.replace(re, '').trim();

  return custID;
}
// 4th index in row is EMPID, so if that is null, then we can say that it is pending
const getPendingBills = (allBills: string[]):string[] => {
  const pendingBills: string[] = [];
  for (let i = 0; i < allBills.length; i++) {
    const row = allBills[i];
    if (row[4] === null) {
      pendingBills.push(row)
    }
  }
  return pendingBills;
}

const getApprovedBills = (allBills: string[]):string[] => {
  const approvedBills: string[] = [];
  for (let i = 0; i < allBills.length; i++) {
    const row = allBills[i];
    if (row[4] !== null) {
      approvedBills.push(row)
    }
  }
  return approvedBills;
}


const BillStatus = () => {

  const [loading, setLoading] = useState(true);
  const [pendingBills, setPendingBills] = useState<string[]>([]);
  const [approvedBills, setApprovedBills] = useState<string[]>([]);
  const location = useLocation();

  useEffect(()=> {
    getCustomerBills(getCustomerID(location.pathname))
    .then(result => {
      setPendingBills(getPendingBills(result));
      setApprovedBills(getApprovedBills(result));
      setLoading(false)
    })
    .catch(err => {
      console.error(err);
    })
  }, [])

  if (loading) {
    return (
      <div>
        <h2>Loading ...</h2>
      </div>
    )
  }

  return (
    <div>
      <h2>Pending Bills</h2>
      <BillPending isApproved={false}
      bills={pendingBills} />
      <h2>Approved Bills</h2>
      <BillPending isApproved={true}
      bills={approvedBills} />
    </div>
  )
}

export default BillStatus;