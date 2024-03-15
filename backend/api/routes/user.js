const express = require("express");
const router = express?.Router();
const checkAuth = require("../middleware/check-auth");
const userController = require("../controllers/userController");

router?.post("/signup", userController.signUp);

router?.post("/signin", userController.login);

router?.get("/", checkAuth, userController?.getAllUsers);

router?.delete("/deleteUser/:id", checkAuth, userController?.deleteUser);

router?.put("/updateUser/:id", checkAuth, userController?.updateUser);

module.exports = router;
