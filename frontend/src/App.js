import React from "react";
import Customers from "./components/Customers/customers";
import Navbar from "./components/Navbar/navbar";
import Transactions from "./components/Transactions/transactions";
import Transfer from "./components/Transfer/transfer";
import { Route, Routes } from "react-router-dom";
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/customers" element={<Customers />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transfer/:pre_from" element={<Transfer />} />
      </Routes>
    </>
  );
}
