const express = require("express");
const router = express.Router();
const { passportStrategy } = require("../middleware/jwt");

const UserController = require("../controller/userController");

// create
router.post("/", passportStrategy, UserController.createNewUser);

// read
router.get("/", passportStrategy, UserController.getAllUser);

// update
router.patch("/:id", passportStrategy, UserController.updateUser);

// delete
router.delete("/:id", passportStrategy, UserController.deleteUser);

module.exports = router;
