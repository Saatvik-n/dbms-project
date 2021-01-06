/* eslint-disable */
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig');

export async function authenticateEmployee(empID: string, password: string): Promise<boolean> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT NAME FROM TEST_EMPLOYEE 
            WHERE EMPID='${empID}' AND
            PASSWORD='${password}'`
    );
    if (result.rows.length === 0) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}
