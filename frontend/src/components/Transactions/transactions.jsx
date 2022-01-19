import React, { useState, useEffect } from "react";
import axios from "axios";

const Transactions = () => {
  const [trans, setTrans] = useState([]);

  const getTrans = async () => {
    const response = await axios.get("/transactions");
    setTrans(response.data);
  };

  useEffect(() => {
    getTrans();
  }, []);

  return (
    <>
      <div className="heading">
        <h1>Transactions</h1>
      </div>
      <div className="table">
        <div className="table-row-head">
          <ul class="list-group list-group-horizontal-sm">
            <li class="list-group-item flex-fill">From</li>
            <li class="list-group-item flex-fill">To</li>
            <li class="list-group-item flex-fill">Amount</li>
          </ul>
        </div>
        {trans.map((curElem) => {
          return (
            <div className="table-row">
              <ul class="list-group list-group-horizontal">
                <li class="list-group-item flex-fill ">{curElem.from}</li>
                <li class="list-group-item flex-fill">{curElem.to}</li>
                <li class="list-group-item flex-fill">Rs. {curElem.amount}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Transactions;
