const express = require("express");
const sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const db = require("./Model");
const userRoutes = require("./Routes/userRoutes");
//setting up port
const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// In development, you may need to drop existing tables and re-sync database. So you can use force: true as code above.
db.sequelize.sync().then(() => {
  console.log("Database synchronized");
});

//routes for the user API
app.use("/api/users", userRoutes);

//listening to server connection
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
