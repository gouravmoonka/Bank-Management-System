const express = require("express");
const App = express();
const mongoose = require("mongoose");
const cors = require("cors");
const customerRouter = require("./routers/customer");
const TransactionsRouter = require("./routers/transaction");

const URI = "mongodb://localhost:27017/dumy";
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connection successful");
  })
  .catch((e) => {
    console.log("no connection");
  });

App.use(express.json());
App.use(cors());
App.use("/customers", customerRouter);
App.use(TransactionsRouter);

const PORT = 8000;
App.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
