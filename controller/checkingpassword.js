const userModel = require("../models/usermodel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function checkingpassword(req, res) {
  try {
    console.log(req.body);
    const { userId, password } = req.body;  // Updated to use 'userId'

    // Log the user ID
    console.log("Received user ID:", userId);

    const user = await userModel.findById(userId);

    if (!user) {
      console.error("User not found with ID:", userId);
      return res.status(404).json({
        ErrorMessage: "User not found",
        error: true,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        ErrorMessage: "Password invalid",
        error: true,
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
    const cookieOption = {
      httpOnly: true,
      secure: true,
    };

    return res.cookie("token", token, cookieOption).status(201).json({
      message: "Password verified",
      token: token,
      success: true,
    });
  } catch (error) {
    console.error("Error in checkingpassword:", error); // Log the error to the console
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
}

module.exports = checkingpassword;


