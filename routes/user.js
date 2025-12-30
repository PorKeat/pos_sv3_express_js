const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers_Porkeat);
router.get("/:id", userController.getUserById_Porkeat);
router.post("/", userController.createUser_Porkeat);
router.put("/:id", userController.updateUser_Porkeat);
router.delete("/:id", userController.deleteUser_Porkeat);

module.exports = router;
