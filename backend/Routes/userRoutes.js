const express = require("express");
const userController = require("../Controllers/userController");
const { signup, login, getAllUsers, user } = userController;
const userAuth = require("../Middlewares/userAuth");

const router = express.Router();

//signup endpoint
//passing the middleware function to the signup
router.post("/signup", userAuth.saveUser, signup);

//login route
router.post("/login", login);

// get all users
router.get("/all", getAllUsers);

// get user by id
router.get("/:id", user);

module.exports = router;
