import React, { useState, useEffect } from 'react';
import { getCustomerMeters } from '../../DBHandler/CustomerFunctions';

const Meters = (props: any) => {
  const [customerMeters, setCustomerMeters] = useState<string[]>([]);

  useEffect(() => {
    getCustomerMeters(props.customerID)
      .then((result) => {
        console.log(result);
        setCustomerMeters(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
          <th>Meter ID</th>
          <th>Meter Name</th>
          <th>Meter Rate</th>
          </tr>
        </thead>
          
        <tbody>
          {customerMeters.map((row, index) => {
            return (
              <tr key={index}>
                <td> {row[0]} </td>
                <td> {row[1]} </td>
                <td> {row[2]} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Meters;
