import dotenv from "dotenv";
// Load environment variables from.env file. You can use `dotenv.config()` to do this.
dotenv.config({
  path: "./.env",
});

import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";

export const generateTokenAndSetToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRET_EXPIRY,
  });



  res.cookie("jwtToken", token, {
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    secure: process.env.NODE_ENV !== "development" ,
    sameSite: process.env.NODE_ENV !== "development" ? "None" : "Lax", // CSRF attack protection
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  });
 //process.env.NODE_ENV !== "development"
  return token;
};

export const register =  async ({ name, email, password }) => {
  //check for validations for empty
  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // check if user already registerd
  const isAlreadyExist = await User.findOne({
    $or: [{ email }],
  });

  if (isAlreadyExist) {
    throw new ApiError(409, "User with this email or username already exists");
  }

  const user = new User({ name, email, password });
  await user.save();

  if (user) {
    const userWithoutPassword = await User.findById(user._id).select(
      "-password"
    );
    return userWithoutPassword;
  }

  throw new ApiError(500, "Internal Server Error in Register Service");
};

export const login =  async ({ email, password }) => {
  const isRegisteredUser = await User.findOne({
    $or: [{ email }], // for user more such as username or any field 
  });

  if (!isRegisteredUser) {
    throw new ApiError(404, "Please Register First");
  }

  if (!isRegisteredUser || !(await isRegisteredUser.comparePassword(password)))
    throw new ApiError(401,"Invalid credentials");

  if (isRegisteredUser) {
    const userWithoutPassword = await User.findById(
      isRegisteredUser._id
    ).select("-password");
    return userWithoutPassword;
  }

  throw new ApiError(500, "Internal Server Error in Login Service");
};


export const getCurrentUser = async ({req}) => {
    const user = await User.findById(req.user._id).select("-password");
  
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return user;
  };
  


