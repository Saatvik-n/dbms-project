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

export async function createNewCustomer(custID: string, password: string, custName: string, custCity: string) {
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
