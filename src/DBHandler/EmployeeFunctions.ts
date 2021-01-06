/* eslint-disable */
import oracledb from "oracledb"
const dbConfig = require('./dbconfig');

export async function loginEmployee(empID: string, password: string): Promise<boolean> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT EMP_NAME FROM EMPLOYEE 
            WHERE EMPLOYEE_ID='${empID}' AND
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

export async function createNewEmployee(empID: string, password: string, empName: string, empPhone: string) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `
      INSERT INTO EMPLOYEE VALUES ( :id, :name, :password, :phone)
      `, 
      [empID, empName, password, empPhone],
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
