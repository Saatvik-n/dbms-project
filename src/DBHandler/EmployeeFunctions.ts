import oracledb from 'oracledb';
const dbConfig = require('./dbconfig');

export async function loginEmployee(
  empID: string,
  password: string
): Promise<boolean> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT EMP_NAME FROM EMPLOYEE 
            WHERE EMPLOYEE_ID='${empID}' AND
            EMP_PWD='${password}'`
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

export async function createNewEmployee(
  empID: string,
  password: string,
  empName: string,
  empPhone: string,
  empCity: string
) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `
      INSERT INTO EMPLOYEE VALUES ( :id, :pwd, :name, :phone, :city)
      `,
      [empID, password, empName, empPhone, empCity],
      { autoCommit: true }
    );

    connection.close();
    return true;
  } catch (error) {
    connection?.close();
    return false;
  }
}

export async function getEmployeeName(empID: string): Promise<string> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    let result = await connection.execute(
      `
      SELECT EMP_NAME FROM EMPLOYEE WHERE EMPLOYEE_ID='${empID}'
      `
    );

    connection.close();
    return result.rows![0] as string;
  } catch (error) {
    connection?.close();
    return 'None';
  }
}
// Get pending complaints
export async function getComplaints(empID: string): Promise<string[]> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    let result = await connection.execute(
      `
      select distinct complaints.complaint_no, complaints.complaint_date, complaints.complaint_desc
    from complaints, employee, customer
      where employee.employee_id = '${empID}'
      and employee.emp_city = customer.cust_city
      and complaints.employee_id IS NULL
      `
    );
    connection.close();
    return result.rows! as string[];
  } catch (error) {
    connection?.close();
    return ['error'];
  }
}

export async function updateComplaints(
  complaintIDs: string[],
  empID: string
): Promise<boolean> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    for (let i = 0; i < complaintIDs.length; i++) {
      const ID = complaintIDs[i];
      await connection.execute(
        `
        UPDATE COMPLAINTS SET EMPLOYEE_ID=:eid WHERE COMPLAINT_NO=:cid
        `,
        [empID, ID],
        { autoCommit: true }
      );
    }
    connection.close();
    return true;
  } catch (error) {
    connection?.close();
    return false;
  }
}
//get bills which have not been approved
export async function getBills(empID: string): Promise<string[]> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    let result = await connection.execute(`
    select distinct bill.billno, bill.total, bill.transactionID, bill.customer_ID, bill.bill_date 
    from bill, customer, employee
    where employee.employee_id = '${empID}'
    and employee.emp_city = customer.cust_city
    and bill.employee_id IS NULL
    `);

    connection.close();
    return result.rows! as string[];
  } catch (error) {
    connection?.close();
    return ['error'];
  }
}

export async function updateBills(billNOs: string[], empID: string):Promise<boolean> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    for (let i = 0; i < billNOs.length; i++) {
      const billno = billNOs[i];
      await connection.execute(
        `
        UPDATE BILL SET EMPLOYEE_ID=:eid WHERE BILLNO=:cid
        `,
        [empID, billno],
        { autoCommit: true }
      );
    }
    connection.close()
    return true;
  } catch (error) {
    connection?.close();
    return false;
  }
}
