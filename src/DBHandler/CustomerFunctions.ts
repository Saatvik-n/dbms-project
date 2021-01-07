import oracledb from 'oracledb';
const dbConfig = require('./dbconfig');

export async function loginCustomer(custID: string, password: string): Promise<boolean> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT CUSTOMER_NAME FROM CUSTOMER 
            WHERE CUSTOMER_ID='${custID}' AND
            PASSWORD='${password}'`
    );
    if (result.rows!.length === 0) {
      return false;
    }
    connection.close();
    return true;
  } catch (error) {
    connection?.close();
    return false;
  }
}

export async function createNewCustomer(custID: string, password: string, custName: string, custCity: string): Promise<boolean> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `
      INSERT INTO CUSTOMER VALUES ( :id, :name, :password, :city)
      `, 
      [custID, custName, password, custCity],
      {autoCommit: true}
    );

    connection.close();
    return true;
  }
  catch(error) {
    connection?.close();
    return false;
  }
}


export async function getCustomerName(custID: string):Promise<string> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);    
    const name = await connection.execute(`
      SELECT CUSTOMER_NAME FROM CUSTOMER WHERE CUSTOMER_ID='${custID}'`
    )

    connection.close();
    console.log(name.rows);
    return name.rows!.toString();
  } catch (error) {
      connection?.close();
      return "Error";
  }

}

export async function getCustomerMeters(custID:string): Promise<string[]> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const meters = await connection.execute(
      `
      SELECT METER_ID, METER_NAME, METER_RATE FROM METER
      WHERE CUSTOMER_ID='${custID}'
      `
    )
    connection.close();
    return meters.rows as string[];

  } catch (error) {
    connection?.close();
    return ["Error"];
  }
}

export async function addMeter(custID:string, meterID:string, meterName:string, meterRate:number):Promise<boolean> {
  let connection;
  try {
    console.log([meterID, meterName, +meterRate.toFixed(2), custID]);
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `
      INSERT INTO METER VALUES(:mid, :mname, :mrate, :cid)
      `,
      [meterID, meterName, +meterRate.toFixed(2), custID],
      {autoCommit: true}
    )

    return true;
  } catch (error) {
    connection?.close()

    return false;
  }
}