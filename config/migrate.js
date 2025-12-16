const sequelize = require("./database");
require("../models/userModel");
require("../models/categoryModel");
require("../models/productModel");
require("../models/orderModel");
require("../models/orderDetailModel");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync({ force: true });
    console.log("Migration completed successfully");

    process.exit();
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
})();
