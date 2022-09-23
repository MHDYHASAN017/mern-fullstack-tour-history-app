const asyncHandler = require("express-async-handler");
const User = require("../models/userSchema");
const { emailValidation } = require("../utils/emailValidation");
const { generateToken } = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password')

  if (!users) {
    res.status(400);
    throw new Error("Something is Wrong");
  } else {
    return res.status(200).json({
        users : users 
    });
  }
});

const currentUser = asyncHandler(async (req, res) => {
  // console.log(req.user);

  const user = await User.findOne({ email: req.user.email });

  // console.log(user);

  if (!user) {
    res.status(404);
    throw new Error("No User Found With This Email");
  } else {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { username, photo, email, password } = req.body;

  if (username === "" || email === "" || password === "") {
    res.status(400);
    throw new Error("please fillup all the fields");
  }
  if (emailValidation(email) === false) {
    res.status(400);
    throw new Error("invalid email address");
  }
  if (password.length <= 5) {
    res.status(400);
    throw new Error("password should be more then 5 charature");
  }
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    username: username,
    photo: photo,
    email: email,
    password: password,
  });

  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      message: "User Registered Successfully",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400);
    throw new Error("please fillup all the fields");
  }
  if (emailValidation(email) === false) {
    res.status(400);
    throw new Error("invalid email address");
  }
  if (password.length <= 5) {
    res.status(400);
    throw new Error("password should be more then 5 charature");
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(404);
    throw new Error("No User Found With This Email");
  } else {
    if (user && user.matchPassword(password)) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid password");
    }
  }
});

module.exports = {
  allUsers,
  currentUser,
  registerUser,
  loginUser,
};
