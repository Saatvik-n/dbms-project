import React from "react"
import {Table} from "react-bootstrap"

const EmpComplaints = (props:any) => {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <td> Complaint No </td>
            <td> Complaint Date </td>
            <td> Complaint Description </td>
            <td> Is it handled? </td>
          </tr>
        </thead>
        <tbody>
          {props.complaints.map((row:any, index: number) => {
            return (
              <tr key={index} >
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td> <input type="checkbox" name="complaint-handle" id=""
                checked={props.fixed[index]}
                onChange={() => props.handleCheckChange(index)} /> </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default EmpComplaints;