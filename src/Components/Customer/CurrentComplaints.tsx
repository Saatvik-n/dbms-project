import React from "react"
import {Table} from "react-bootstrap"

const CurrentComplaints = (props: any) => {

  if (props.complaints.length === 0) {
    return (
      <h4 style={{textAlign: "center"}} > No such complaints found </h4>
    )
  }

  return (
    <Table>
      <thead>
        <tr>
          <td>Complaint No</td>
          <td>Complaint Date </td>
          <td>Complaint Desc</td>
          {
            props.isApproved ? (
              <td> Employee ID </td>
            ) : null
          }
        </tr>
      </thead>
      <tbody>
          {
            props.complaints.map((row: any, index:number) => {
              return (
                <tr key={index} >
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2].trim()}</td>
                  {props.isApproved ? (
                    <td>
                      {row[4]}
                    </td>
                  ) : null}
                </tr>
              )
            })
          }
      </tbody>
    </Table>
  )
}

export default CurrentComplaints;