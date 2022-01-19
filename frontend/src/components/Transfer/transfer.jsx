import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./transfer.css"

const Transfer = () => {
  const { pre_from } = useParams();

  let navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    from: pre_from,
    to: "",
    amount: "",
  });

  const handleSelect = async (name) => {
    setFormValues({ ...formValues, ["to"]: name });
  };

  const [toList, setToList] = useState([]);

  const to_list = async () => {
    try {
      const res = await axios.get("/customers/list", {
        params: { from_name: pre_from },
      });
      setToList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    to_list();
  }, []);

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Promise.all([
        axios.post("/transfer", { formValues }),
        axios.patch("/customers/update", { formValues }),
      ]);
    } catch (error) {
      console.log(error);
    }
    navigate("/transactions");
  };

  return (
    <>
      <div className="transfer-page">
        <div className="page-header">
          <h1>Transfer</h1>
        </div>
        <div className="transfer-row">
          <ul class="list-group list-group-horizontal">
            <li class="list-group-item flex-fill ">
              <label htmlFor="from">From:</label>
              <input type="text" placeholder={pre_from} name="from" readOnly />
            </li>
            <li class="list-group-item flex-fill ">
              <label htmlFor="to">To:</label>
              <input
                type="text"
                placeholder="transfer to"
                name="to"
                value={formValues.to}
                required
                onChange={handleChange}
              />
            </li>
            <li class="list-group-item flex-fill ">
              <label htmlFor="amount">Amount in Rupees:</label>
              <input
                type="text"
                placeholder="Amount"
                name="amount"
                value={formValues.amount}
                required
                onChange={handleChange}
              />
            </li>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-dark btn-lg btn-block"
            >
              TRANSFER
            </button>
          </ul>
        </div>

        <div className="list">
          <div className="list-header">Select Whom to transfer?</div>
          <div className="list-data">
            {toList.map((curElem) => {
              return (
                <div className="list-single-data">
                  <div class="list-group">
                    <button
                      type="button"
                      class="list-group-item list-group-item-action"
                      onClick={() => {
                        handleSelect(curElem.name);
                      }}
                    >
                      Name:{curElem.name} | Email:{curElem.email}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Transfer;
