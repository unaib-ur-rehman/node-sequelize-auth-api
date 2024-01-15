const express = require("express");
const db = require("../Model");
// Assigning db.user to User variable
const User = db.user;

// Function to check if username or email already exists in the database
const saveUser = async (req, res, next) => {
  try {
    const username = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (username) {
      return res.status(409).send("Username already taken");
    }
    const emailCheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (emailCheck) {
      return res.status(409).send("Email already exists");
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

// Exporting module
module.exports = {
  saveUser,
};
