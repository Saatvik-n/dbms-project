import React, { useEffect, useState } from 'react';
import { getCustomerUsage } from '../../DBHandler/CustomerFunctions';

const getTotal = (usageArray:string[]):number => {
  let total = 0;
  for (let i = 0; i < usageArray.length; i++) {
    const price = +usageArray[i][2];
    total = total + price;
  }
  return total;
}

const MeterUsage = (props: any) => {
  const [custUsage, setCustUsage] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  console.log(props.custID);

  useEffect(() => {
    getCustomerUsage(props.custID)
      .then((result) => {
        console.log(`meter usage result = ${result}`);
        setCustUsage(result);
        if (props.generateTotal ||props.priceHandler ) {
          setTotal(getTotal(result))
          props.priceHandler(getTotal(result));
        }
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
          {
            props.generateTotal ? (
              <tr>
                <td colSpan={3} >
                  Total: {total}
                </td>
              </tr>
            )
            : null
          }
        </tbody>
      </table>
    </div>
  );
};

export default MeterUsage;
