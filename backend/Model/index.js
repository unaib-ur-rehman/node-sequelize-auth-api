const { DataTypes, Sequelize } = require("sequelize");
const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    // Optionally, throw an error or exit the application here
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../Model/userModel")(sequelize, Sequelize);

module.exports = db;
