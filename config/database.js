const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ debug: false });

const sequelize = new Sequelize(
  process.env.DB_NAME || "database",
  process.env.DB_USER || "username",
  process.env.DB_PASSWORD || "password",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: false,
  }
);

function connectDB(callback) {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected successfully.");
      callback(null, sequelize);
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
      callback(err);
    });
}

module.exports = { sequelize, connectDB };
