import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const getData = (reqBody, isLogout = false) => {
  if (!reqBody || !reqBody.username || (!isLogout && !reqBody.password)) {
    const error = isLogout
      ? "username is required"
      : "username and password are required";
    return { error };
  }

  const { username, password } = reqBody;
  return isLogout ? { username } : { username, password };
};

// SignUp logic
const signupController = async (req, res) => {
  try {
    const { username, password, error } = getData(req.body);
    if (error) {
      return res.status(400).json({ success: false, error });
    }
    const existingUser = await User.checkIfExists(username);
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, error: "User already exists" });
    }

    const user = await User.create({ username, password });
    if (!user) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to create user" });
    }
    console.log("user created successfully", user.uid);
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      userId: user.uid,
    });
  } catch (err) {
    console.error("Error during signup:", err);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

// Login logic | jwt access and refresh token logic here
const loginController = async (req, res) => {
  // Authenticate the User
  try {
    const { username, password, error } = getData(req.body);
    if (error) {
      return res.status(400).json({ success: false, error });
    }
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res
        .status(409)
        .json({ success: false, error: "User does not exist" });
    }
    if (!user.validatePassword(password)) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid password" });
    }
    // sign the jwts
    const payload = {
      uid: user.uid,
      username: user.username,
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{
      expiresIn:process.env.JWT_EXPIRATION_TIME // increase to 20mins or more when prod
    });
    const refershToken = jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET)
    // if password is correct log the user in by changing loggedin field to true
    user.loggedin = true;
    try {
      await user.save();
    } catch (err) {
      console.error("Error saving user:", err);
      return res
        .status(500)
        .json({ success: false, error: "Failed to update user status" });
    }
    console.log(`${user.username} logged in successfully`);

    return res
      .status(200)
      .json({
        success: true,
        message: "login successful",
        accessToken: accessToken,
      });
  } catch (err) {
    console.log("Error during login:", err);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

const logoutController = async (req, res) => {
  try {
    const { username, error } = getData(req.body, true);
    if (error) {
      return res.status(400).json({ success: false, error });
    }
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res
        .status(409)
        .json({ success: false, error: "User does not exist" });
    }
    if (!user.loggedin) {
      return res
        .status(401)
        .json({ success: false, error: "User already logged out" });
    }
    // if user found and user is logged in log them out
    user.loggedin = false;
    try {
      await user.save();
    } catch (err) {
      console.error("Error logging out user:", err);
      return res
        .status(500)
        .json({ success: false, error: "Failed to logout user" });
    }
    console.log(`${user.username} logged out successfully`);
    return res
      .status(200)
      .json({ success: true, message: "logout successful" });
  } catch (err) {
    console.log("Error during logout:", err);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export { signupController, loginController, logoutController };
