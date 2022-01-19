import React, { useState, useEffect } from "react";
import axios from "axios";
import "./customers.css";
import { Link } from "react-router-dom";

const Customers = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await axios.get("/customers");
    setUsers(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="heading">
        <h1>Customers List</h1>
      </div>
      <div className="table">
        <div className="table-row-head">
          <ul class="list-group list-group-horizontal-sm">
            <li class="list-group-item flex-fill">Name</li>
            <li class="list-group-item flex-fill">Email Add</li>
            <li class="list-group-item flex-fill">Balance</li>
          </ul>
        </div>
        {users.map((curElem) => {
          return (
            <div className="table-row">
              <ul class="list-group list-group-horizontal ">
                <li class="list-group-item flex-fill ">{curElem.name}</li>
                <li class="list-group-item flex-fill">{curElem.email}</li>
                <li class="list-group-item flex-fill">Rs. {curElem.balance}</li>
                <Link
                  className="btn btn-outline-primary"
                  to={`/transfer/${curElem.name}`}
                >
                  TRANSFER
                </Link>
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Customers;
