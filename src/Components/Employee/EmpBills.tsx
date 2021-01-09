import React from "react"
import {Table} from "react-bootstrap"

const EmpBills = (props: any) => {
  
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <td>Bill No</td>
            <td>Total Amount</td>
            <td>Transaction ID</td>
            <td>Customer ID</td>
            <td>Bill Date</td>
            <td>Approve ?</td>
          </tr>
        </thead>
        <tbody>
          {props.bills.map((row: any, index:number)=> (
            <tr key={index} >
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td>{row[3]}</td>
              <td>{row[4]}</td>
              <td>
              <input type="checkbox" name="bill-approve" id=""
                checked={props.fixed[index]}
                onChange={() => props.handleCheckChange(index)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
export default EmpBills;