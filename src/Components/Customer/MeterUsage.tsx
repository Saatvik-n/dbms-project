import React, { useEffect, useState } from 'react';
import { getCustomerUsage } from '../../DBHandler/CustomerFunctions';

const MeterUsage = (props: any) => {
  const [custUsage, setCustUsage] = useState<string[]>([]);
  console.log(props.custID);

  useEffect(() => {
    getCustomerUsage(props.custID)
      .then((result) => {
        console.log(`meter usage result = ${result} `);
        setCustUsage(result);
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
            <th>Meter Name</th>
            <th>Meter Units</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {custUsage.map((row, index) => {
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

export default MeterUsage;
