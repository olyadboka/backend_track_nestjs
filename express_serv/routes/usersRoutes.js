const express = require("express");
const userController = require("../controllers/userController.js");

const router = express.Router();

//Create user

router.post("/users", userController.createUser);
//Reading all the users
router.get("/users", userController.getUsers);

//Update a user by ID
router.put("/users/:id", userController.updateUser);

//Delete a user by ID

router.delete("/users/:id", userController.delete);

module.exports = router;
