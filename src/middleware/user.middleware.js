const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
require("dotenv").config()

const Authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if(!token){
        console.log("token is not founded")
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
    req.user = user;
    next();
    // *****************************************
  } catch (err) {
    console.error("Token verification error:", err);
  }
};

module.exports = { Authentication };
