const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Must required Name"],
      trim: true,
      maxlength: 50,
      minlength: 3,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      // validate: [validateEmail, 'Please fill a valid email address'],
      match: [
        /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    contactNo: {
      type: Number,
      minlength: 10,
      maxlength: 10,
      required: [true, "Must provide Contact NO."],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      //   maxlength: 32,
      minlength: 8,
      required: [true, "Must required Password"],
      //   match: [/^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,}$/],
    },
    isEmployee: {
      type: String,
      enum: {
        values: ["active", "deactive", "blocked"],
        message: `{VALUE} is not supported`,
      },
      default: "active",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Employee", EmployeeSchema);
