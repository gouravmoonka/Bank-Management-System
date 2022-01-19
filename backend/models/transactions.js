const mongoose = require("mongoose");

const transaction = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = new mongoose.model("TRANSACTION", transaction);
