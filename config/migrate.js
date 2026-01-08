const sequelize = require("./database");

// Import all models (so Sequelize knows about them)
require("../models/userModel");
require("../models/categoryModel");
require("../models/productModel");
require("../models/orderModel");
require("../models/orderDetailModel");

// Run migration
(async function migrate() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync({ force: true });
    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1); // exit only on error
  }
})();
