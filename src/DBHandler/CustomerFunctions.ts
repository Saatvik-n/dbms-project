import oracledb from 'oracledb';
const dbConfig = require('./dbconfig');
import { CURRENT_MONTH, CURRENT_YEAR } from '../CurrentDate';
import { uuid } from 'uuidv4';

const DATE = CURRENT_MONTH + CURRENT_YEAR;

export async function loginCustomer(
  custID: string,
  password: string
): Promise<boolean> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT CUST_NAME FROM CUSTOMER 
            WHERE CUSTOMER_ID='${custID}' AND
            CUST_PWD='${password}'`
    );
    if (result.rows!.length === 0) {
      connection.close();
      return false;
    }
    connection.close();
    return true;
  } catch (error) {
    connection?.close();
    return false;
  }
}

export async function createNewCustomer(
  custID: string,
  password: string,
  custName: string,
  custCity: string,
  custPhone: string,
  custStreet: string
): Promise<boolean> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `
      INSERT INTO CUSTOMER VALUES ( :id, :pwd, :name, :street, :city, :phone)
      `,
      [custID, password, custName, custStreet, custCity, custPhone],
      { autoCommit: true }
    );

    connection.close();
    return true;
  } catch (error) {
    connection?.close();
    return false;
  }
}

export async function getCustomerName(custID: string): Promise<string> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const name = await connection.execute(`
      SELECT CUST_NAME FROM CUSTOMER WHERE CUSTOMER_ID='${custID}'`);

    connection.close();
    console.log(name.rows);
    return name.rows!.toString();
  } catch (error) {
    connection?.close();
    return 'Error';
  }
}

export async function getCustomerMeters(custID: string): Promise<string[]> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const meters = await connection.execute(
      `
      SELECT METER_ID, METER_NAME, METER_RATE FROM METER
      WHERE CUSTOMER_ID='${custID}'
      `
    );
    //returns meter id, metername, meter rate
    connection.close();
    return meters.rows as string[];
  } catch (error) {
    connection?.close();
    return ['Error'];
  }
}

//this adds the meter into the Meter Table. It does not add the meter into the usage
export async function addMeter(
  custID: string,
  meterID: string,
  meterName: string,
  meterRate: number
): Promise<boolean> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `
      INSERT INTO METER VALUES(:mid, :mname, :mrate, :cid)
      `,
      [meterID, meterName, +meterRate.toFixed(2), custID],
      { autoCommit: true }
    );
    connection.close();
    return true;
  } catch (error) {
    connection?.close();

    return false;
  }
}

//this gets the metername, units, and price for this month
export async function getCustomerUsage(custID: string): Promise<string[]> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const usage = await connection.execute(
      `
      select meter.meter_name, g.units, (g.units * meter.meter_rate) as price 
      from givesbill g, customer, meter 
      where g.meter_id = meter.meter_id
      and g.usage_date = '${DATE}'
      and customer.customer_id = '${custID}'
      `
    );
    connection.close();
    return usage.rows as string[];
  } catch (error) {
    connection?.close();
    return ['Error'];
  }
}

export async function updateUsage(
  usageArray: string[],
  meterArray: string[]
): Promise<boolean> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await setZeroUsage(meterArray);
    for (let i = 0; i < usageArray.length; i++) {
      const usageValue = +usageArray[i]; //the value of the meter
      const meterID = meterArray[i]; //id of meter
      console.log(`Array = ${[usageValue, meterID]}`);
      try {
        await connection.execute(
          `UPDATE GIVESBILL SET UNITS=:us WHERE
        METER_ID=:mi AND
        USAGE_DATE=:ud `,
          [usageValue, meterID, DATE],
          { autoCommit: true }
        );
      } catch (err) {
        console.error('Error inside for loop');
        connection.close();
        return false;
      }
    }

    connection.close();
    return true;
  } catch (error) {
    console.error(`Error in updating usage: \n ${error}`);
    connection?.close();
    return false;
  }
}
//This sets the usage for all meters in the current month to 0, only for use in this file
async function setZeroUsage(meterArray: string[]): Promise<void> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    for (const i in meterArray) {
      const meter = meterArray[i];
      try {
        await connection.execute(
          `
          INSERT INTO GIVESBILL (USAGE_DATE, UNITS, METER_ID)
          VALUES(:ud, :u, :mid)
          `,
          [DATE, 0, meter],
          { autoCommit: true }
        );
      } catch (err) {
        console.error(err);
        continue; //ignore the error
      }
    }
    connection.close();
  } catch (error) {
    connection?.close();
    return;
  }
}

//this is to insert a record into the BILL table once user has paid the bill with the transaction ID
//bill no will be generated randomly now, bill date will be taken as the current date
export async function insertBill(
  transID: string,
  custID: string,
  total: number
): Promise<boolean> {
  let connection;
  let billNumber = uuid().substring(0, 15);
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `
      INSERT INTO BILL (BILLNO, TOTAL, TRANSACTIONID, CUSTOMER_ID, BILL_DATE) VALUES 
      (:bn, :tot, :tid, :cid, :bd)
      `,
      [billNumber, total, transID, custID, DATE],
      { autoCommit: true }
    );
    connection.close();
    return true;
  } catch (error) {
    connection?.close();
    console.error(error);
    return false;
  }
}

export async function checkHasPaid(custID: string): Promise<boolean> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `
      SELECT BILLNO FROM BILL WHERE CUSTOMER_ID='${custID}'
      AND BILL_DATE='${DATE}'
      `
    );
    //this means that there are no bills paid for this month
    if (result.rows!.length === 0) {
      connection.close();
      return false;
    }
    connection.close();
    return true;
  } catch (err) {
    console.error(err);
    connection?.close();
    return false;
  }
}

export async function getCustomerBills(custID: string): Promise<string[]> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `
      SELECT * FROM BILL WHERE CUSTOMER_ID='${custID}'
      `
    );
    connection.close();
    return result.rows as string[];
  } catch (error) {
    connection?.close();
    return ['error'];
  }
}

export async function insertComplaint(
  custID: string,
  desc: string
): Promise<boolean> {
  let connection;
  let complaintID = uuid().substring(0, 15);
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `
      INSERT INTO COMPLAINTS (COMPLAINT_NO, COMPLAINT_DATE, COMPLAINT_DESC, CUSTOMER_ID)
      VALUES (:coid, :cdate, :cdesc, :cid)
      `,
      [complaintID, DATE, desc, custID],
      { autoCommit: true }
    );
    connection.close();
    return true;
  } catch (error) {
    connection?.close();
    return false;
  }
}

export async function getCustomerComplaints(custID: string): Promise<string[]> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `
      SELECT * FROM COMPLAINTS WHERE CUSTOMER_ID='${custID}'
      `
    );
    connection.close();
    return result.rows as string[];
  } catch (error) {
    connection?.close();
    return ['error'];
  }
}
