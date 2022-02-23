const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    sender: Joi.mongoose(),
    // {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Customer",
    //     required: [true, "Sender Id required"]
    // },
    receiver: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: [true, "Receiver Id required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount required"],
    },
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
