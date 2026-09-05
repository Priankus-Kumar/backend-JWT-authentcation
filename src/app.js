const express = require("express");
const connectDB = require("./config/db.config.js");
const UserRoute = require("./routes/user.route.js");
const app = express();

app.use(express.json());
app.use("/api/user", UserRoute);
connectDB();

module.exports = app;
