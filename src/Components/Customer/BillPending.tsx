import React from "react"
import {Table} from "react-bootstrap"

const BillPending = (props:any) => {

  if (props.bills.length === 0) {
    return (
      <h3 style={{textAlign: "center"}} > Nothing to display </h3>
    )
  }

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <td>Bill No</td>
            <td>Amount</td>
            <td>Transaction ID</td>
            {props.isApproved ? (
              <td>Employee ID</td>
            ) : null}
            <td>Bill Month</td>
          </tr>
        </thead>
        <tbody>
          {
            props.bills.map((row: string[], index: number) => {
              return (
                <tr key={index} >
                  <td> {row[0]} </td>
                  <td> {row[1]} </td>
                  <td> {row[2]} </td>
                  {props.isApproved ? (
                    <td> {row[4]} </td>
                  ): null}
                  <td> {row[5].toString().substring(4, 7)} </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

export default BillPending;