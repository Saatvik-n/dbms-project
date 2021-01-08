import React from "react"

const PayBill = (props:any) => {

  return (
    <div>
      <h3 style={{color: "red"}} >
        AFTER PAYING BILL, YOU WILL NOT BE ABLE TO CHANGE USAGE
      </h3>
      <form>
        <label htmlFor="trans-id"> Transaction ID
          <input type="text" value={props.transID}
          onChange={props.onTransChange} />
        </label>
        <br/>
        <label htmlFor="bill-total">
          Total: {props.total}
        </label>
        <br/>
        <button 
        onClick={(e) => props.submit(e)} >
          Pay bill
        </button>
      </form>
    </div>
  )
}

export default PayBill;