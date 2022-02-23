const mongoose = require("mongoose");
const Joi = require("joi");
const checkEmail = require("../middlewares/uniqueEmail");
const checkPhone = require("../middlewares/uniquePhone");

const CustomerSchema = new mongoose.Schema(
  {
    name: Joi.string().required().pattern(new RegExp("^[a-zA-Z]{3,30}$")),
    email: Joi.string()
      .required()
      .trim()
      .lowercase()
      .external(checkEmail)
      .email(),
    // {
    //   type: String,
    //   trim: true,
    //   lowercase: true,
    //   unique: true,
    //   required: "Email address is required",
    //   // validate: [validateEmail, 'Please fill a valid email address'],
    //   match: [
    //     /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
    //     "Please fill a valid email address",
    //   ],
    // },
    contactNo: Joi.number().max(10).min(10).required().external(checkPhone),
    // {
    //   type: Number,
    //   minlength: 10,
    //   maxlength: 10,
    //   required: [true, "Must provide Contact NO."],
    //   unique: true,
    //   trim: true,
    // },
    password: Joi.string(),
    // {
    //   type: String,
    //   // maxlength: 100,
    //   minlength: 8,
    //   required: [true, "Must required Password"],
    //   // match: [/^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,}$/]
    // },

    CIF_No: Joi.string().alphanum(),
    // {
    //   type: Number,
    //   default: 0,
    // },
    isActive: Joi.string()
      .valid("active", "deactive", "blocked", "notVarified")
      .default("notVarified"),
    // {
    //   type: String,
    //   enum: {
    //     values: ["active", "deactive", "blocked", "notVarified"],
    //     message: `{VALUE} is not supported`,
    //   },
    //   default: "notVarified",
    // },
    createdAt: Joi.date().default(Date.now()),
    // {
    //   type: Date,
    //   default: Date.now(),
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);
