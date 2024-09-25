import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import { expressjwt } from "express-jwt";

export const validationMiddleware = expressjwt({
  secret: config.get("JWTSECRET"),
  algorithms: ["HS256"],
});

export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if all required fields are filled
    if (!email || !username) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //jwt token

    // const token = jwt.sign({ email }, config.get("JWTSECRET"), {
    //   expiresIn: "1d",
    // });

    // Create a new user
    const user = new userModel({
      email,
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Respond with a success message
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
      // token,
    });
  } catch (error) {
    console.error("Error during user registration:", error);

    // Respond with an error message
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all required fields are filled
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    // Check if the user exists
    const user = await userModel.findOne({ email }); // Find the user by email
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Sign a JWT token with the user's ID
    const token = jwt.sign({ _id: user._id }, config.get("JWTSECRET"), {
      expiresIn: "1d",
    });

    // Hide the password in the response
    user.password = undefined;

    // Respond with success
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Error during user login:", error);

    // Respond with an error message
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const user = await userModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Password validation
    if (password && password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Hash the password if provided
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : user.password;

    // Update the user
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      {
        username: username || user.username, // Fix object assignment syntax
        password: hashedPassword || user.password, // No need for fallback again
      },
      { new: true } // Return the updated document
    );

    updateUser.password = undefined;
    // Respond with success
    res.status(200).json({
      success: true,
      message: "User updated successfully Pls login again",
      user: updatedUser,
    });
    console.log(updatedUser);
  } catch (error) {
    console.error("Error during user update:", error);

    // Respond with an error message
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default { register, login, updateUser, validationMiddleware };
