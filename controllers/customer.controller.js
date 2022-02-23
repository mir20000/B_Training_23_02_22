const Customer = require("../models/customer.model");
const asyncWrapper = require("../middlewares/asyncWrapper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const autoIdGenerator = require("../middlewares/autoIdGenerator");
const accountModel = require("../models/account.model");
const errorHandler = require("../middlewares/errorHandler");
const CustomApiError = require("../error/customApiError");
const { StatusCodes } = require("http-status-codes");

const allCust = asyncWrapper(async (req, res) => {
  const customers = await Customer.find({});

  if (customers.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "No customers Found" });
  }
  res.status(200).json({
    success: true,
    count: customers.length,
    customers: customers,
  });
});

const signUp = asyncWrapper(async (req, res) => {
  const { name, email, contactNo, password } = req.body;
  // console.log("hi");
  const cifNo = await autoIdGenerator();
  const encPass = await bcrypt.hash(password, 12);
  Customer;
  const customers = await Customer.create({
    name: name,
    email: email,
    contactNo: contactNo,
    password: encPass,
    CIF_No: cifNo,
  });

  const account = await accountModel.create({});
  if (!customers) {
    return res
      .status(404)
      .json({ success: false, message: "Customer not added" });
  }

  res.status(201).json({
    success: true,
    message: `Customer Inserted with id: ${customers._id} `,
    customers: customers,
  });
});

const signIn = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  // console.log("hi");
  const customers = await Customer.findOne({ email });
  // console.log(customers);
  if (!customers) {
    return res
      .status(400)
      .json({ success: false, message: "User dose not Exist" });
  }
  const isPasswordCorrect = await bcrypt.compare(password, customers.password);

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json({ success: false, message: "invalid Password" });
  }
  const token = jwt.sign(
    {
      email: customers.email,
      id: customers._id,
      user_type: "customer",
    },
    process.env.EncKey,
    { expiresIn: 3600 }
  );
  res.status(201).json({
    success: true,
    message: "Sucessfully login",
    customers: customers,
    token: token,
    expiresIn: 3600,
  });
});
// const getCust = asyncWrapper(async (req, res) => {
//   const { id } = req.params;
//   const customers = await Customer.findById(id);
//   if (!customers) {
//     return res
//       .status(404)
//       .json({ success: false, message: "Customer not found" });
//   }
//   res.status(200).json({
//     success: true,
//     message: `Customer find with id ${customers._id}`,
//     customers: customers,
//   });
// });
const setCust = asyncWrapper(async (req, res) => {
  const { id: custId } = req.params;
  const customers = await Customer.findOneAndUpdate({ _id: custId }, req.body, {
    new: true,
    runValidators: true,
    // overwrite: true
  });

  if (!customers || customers.length <= 0) {
    return res
      .status(404)
      .json({ success: false, message: "Customer Id not found" });
  }
  res.status(200).json({
    success: true,
    message: "customer Updated",
    customers: customers,
  });
});
const delCust = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const customers = await Customer.findOneAndUpdate(
    { _id: id },
    { isActive: "deactive" },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!customers) {
    return res.status(404).json({
      success: false,
      message: `Customer not found with ${id}`,
    });
  }

  res.status(200).json({
    success: true,
    message: "Customer Deleted",
    customers: customers,
  });
});
const blockCust = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const customers = await Customer.findOneAndUpdate(
    { _id: id },
    { isActive: "blocked" },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!customers) {
    return res.status(404).json({
      success: false,
      message: `Customer not found with ${id}`,
    });
  }

  res.status(200).json({
    success: true,
    message: "Customer Blocked",
    customers: customers,
  });
});

////////////////////////////////////////////////////////////////
//THIS PART
////////////////////////////////////////////////////////////////
const getCust = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const customers = await Customer.findById(id);
  if (!customers) {
    return next(new CustomApiError(StatusCodes.NOT_FOUND));
  }
  res.status(200).json({
    success: true,
    message: `Customer find with id ${customers._id}`,
    customers: customers,
  });
});

module.exports = {
  allCust,
  signUp,
  signIn,
  getCust,
  setCust,
  delCust,
  blockCust,
};
