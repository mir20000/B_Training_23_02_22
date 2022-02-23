const mongoose = require("mongoose");
const Joi = require("joi");

const TransactionSchema = new mongoose.Schema(
  {
    sender: Joi.ObjectId().ref("Customer").required(),
    // {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Customer",
    //     required: [true, "Sender Id required"]
    // },
    receiver: Joi.ObjectId().ref("Customer").required(),
    // {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Customer",
    //   required: [true, "Receiver Id required"],
    // },
    amount: Joi.number().default(0),
    // {
    //   type: Number,
    //   required: [true, "Amount required"],
    // },
    status: {
      type: String,
      enum: {
        values: ["failed", "success", "pending"],
        message: `{VALUE} is not supported`,
      },
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Transaction", TransactionSchema);
