const router = new require("express").Router();
const Transactions = require("../models/transactions");
const Customer = require("../models/customer");

router.get("/transactions", async (req, res) => {
  try {
    const data = await Transactions.find();
    res.send(data);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/transfer", async (req, res) => {
  try {
    console.log("inside post transaction");
    console.log(req.body.formValues);
    const { from, to, amount } = req.body.formValues;
    const query1 = { name: from };
    const query2 = { name: to };
    const doc1 = await Customer.findOne(query1);
    if (!doc1) {
      alert("Invalid Details");
      res.status(404).send(`${query1} not found`);
    } else {
      const doc2 = await Customer.findOne(query2);
      if (!doc2) {
        alert("Invalid Details");
        res.status(404).send(`${query2} not found`);
      } else {
        const data = await new Transactions({
          from,
          to,
          amount,
        });
        const newData = await data.save();
        alert("Transaction Successful");
        res.status(200).send(newData);
      }
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
