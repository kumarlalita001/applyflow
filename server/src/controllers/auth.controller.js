import dotenv from "dotenv";
// Load environment variables from.env file. You can use `dotenv.config()` to do this.
dotenv.config({
  path: "./.env",
});

import asyncHandler from "../utils/asyncHandler.js";
import * as authService from "../services/auth.service.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

export const register = asyncHandler(async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    const token = authService.generateTokenAndSetToken(user._id, res);

    res
      .status(201)
      .json(
        new ApiResponse(201, { user, token }, "Registration Successfull")
      );
  } catch (error) {
    console.log("Error in Register Controller", error);
    next(new ApiError(error.statusCode, error.message));
  }
});

export const login = asyncHandler(async (req, res) => {
  try {
    const user = await authService.login(req.body);
    const token = authService.generateTokenAndSetToken(user._id, res);

    res
      .status(201)
      .json(
        new ApiResponse(201, { user, token }, "Login Successfull")
      );
  } catch (error) {
    console.log("Error in Login Controller", error);
    throw new ApiError(error.statusCode, error.message);
  }
});

export const logout = asyncHandler(async (_req, res) => {
  try {
    const options = {
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
      secure: process.env.NODE_ENV !== "development",
      sameSite: process.env.NODE_ENV !== "development" ? "None" : "Lax", // CSRF attack protection
    };

    res
      .clearCookie("jwtToken", options)
      .json(new ApiResponse(200, {}, "Log Out  Successfull"));
  } catch (error) {
    console.log("Error in Logout Controller", error);
    throw new ApiError(error.statusCode, error.message);
  }
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = authService.getCurrentUser(req);

  if (!user) {
    throw new ApiError(404, "Please Login or Register");
  }
  res.status(200).json(new ApiResponse(200, user, "User fetched Successfully"));
});
