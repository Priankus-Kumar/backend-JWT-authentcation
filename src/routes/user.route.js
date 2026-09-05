const express = require("express");
const {
  registerController,
  verifyController,
  LoginController,
} = require("../controllers/user.controller");

const { Authentication } = require("../middleware/user.middleware");

const router = express.Router();

router.post("/register", registerController);
router.get("/me", Authentication, verifyController);
router.get("/login",LoginController)

module.exports = router;
