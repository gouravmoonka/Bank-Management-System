const mongoose = require("mongoose");
const validator = require('validator');

const customer = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            validate: (value) => {
                return validator.isEmail(value)
            }
        },
        balance: {
            type: Number,
            default: 0
        }
    }
)
module.exports =new mongoose.model('Customer', customer);