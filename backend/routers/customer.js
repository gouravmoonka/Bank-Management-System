const router = new require("express").Router();
const Customer = require("../models/customer");

//get all excluding one
router.get("/list", async (req, res) => {
  try {
    const from_name = req.query.from_name;
    const customersData = await Customer.find({ name: { $ne: from_name } });
    res.json(customersData);
  } catch (error) {
    console.log(error);
  }
});


router.get("/", async (req, res) => {
  try {
    const customersData = await Customer.find();
    res.json(customersData);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const customerData = await Customer.findById(id);
    res.json(customerData);
  } catch (error) {
    console.log(error);
  }
});

//get all excluding one
router.get("/list", async (req, res) => {
  try {
    console.log("Inside /list");
    const from_name = req.query.from_name;
    const customersData = await Customer.find({ name: { $ne: from_name } });
    res.json(customersData);
  } catch (error) {
    console.log(error);
  }
});

router.patch("/update", async (req, res) => {
  try {
    console.log("inside patch");
    console.log(req.body.formValues);
    const { from, to, amount } = req.body.formValues;
    const query1 = { name: from };
    const query2 = { name: to };
    const doc1 = await Customer.findOne(query1);
    if (!doc1) {
      res.status(404).send(`${from} not found`);
    } else {
      const doc2 = await Customer.findOne(query2);
      if (!doc2) {
        res.status(404).send(`${to} not found`);
      } else {
        await Promise.all([
          Customer.findOneAndUpdate(
            query1,
            { $inc: { balance: amount * -1 } },
            {
              new: true,
            }
          ),
          Customer.findOneAndUpdate(
            query2,
            { $inc: { balance: amount } },
            {
              new: true,
            }
          ),
        ]);
        res.status(200).send("Balance Updated");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

module.exports = router;
