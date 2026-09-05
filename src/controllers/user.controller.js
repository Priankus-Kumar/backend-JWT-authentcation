const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const user = await UserModel.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    // ================================================================================
    //                           JWT CODE
    // ================================================================================
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { userId: user._id, token },
    });
  } catch (err) {
    console.error("internal server error", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const verifyController = async (req, res) => {
  try {
    console.log(req.user);
    res.status(200).json({
      data: {
        user: req.user,
      },
    });
  } catch (err) {
    console.log("errpr-->>", err);
  }
};

const LoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { token, userId: user._id },
    });
  } catch (err) {
    console.error('Login error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { registerController, verifyController,LoginController };
