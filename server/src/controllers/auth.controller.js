import asyncHandler from "../utils/asyncHandler.js";
import * as authService from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/apiError.js";

export const register = asyncHandler(async (req, res) => {
  try {
    const user = await authService.register(req.body);
    authService.generateTokenAndSetToken(user._id, res);

    res
      .status(201)
      .json(new ApiResponse(201, user, "User Registered Successfully"));
  } catch (error) {
    console.log("Error in Register Controller", error);
    throw new ApiError(error.statusCode, error.message);
  }
});

export const login = asyncHandler(async (req, res) => {
  try {
    const user = await authService.login(req.body);
    authService.generateTokenAndSetToken(user._id, res);

    res
      .status(201)
      .json(new ApiResponse(201, user, "User Registered Successfully"));
  } catch (error) {
    console.log("Error in Login Controller", error);
    throw new ApiError(error.statusCode, error.message);
  }
});

export const logout = asyncHandler(async (_req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    };

    res
      .clearCookie("jwtToken", options)
      .json(new ApiResponse(200, {}, "User Log Out  Successfully"));
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
