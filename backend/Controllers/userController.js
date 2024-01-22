const bcrypt = require("bcrypt");
const db = require("../Model");
const jwt = require("jsonwebtoken");
const User = db.user;

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.secretKey, {
    expiresIn: "1d",
  });
};

const createUser = async ({ username, email, password, phone }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    phone,
  });
  return user;
};

const signup = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    const user = await createUser({ username, email, password, phone });
    if (user) {
      const token = generateToken(user.id);
      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("user", JSON.stringify(user, null, 2));
      return res.status(201).send(user);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user.id);
      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("user", JSON.stringify(user, null, 2));
      console.log("token", token);
      return res.status(201).json({ user, token }); // Include the token in the response
    } else if (user && !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};


//get all the users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users) {
      return res.status(200).send(users);
    }
  } catch (error) {
    console.log(error);
  }
};

const user = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (user) {
      return res.status(200).send(user);
    }else{
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  login,
  getAllUsers,
  user,
};
