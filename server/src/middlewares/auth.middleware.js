import dotenv from "dotenv";
// Load environment variables from.env file. You can use `dotenv.config()` to do this.
dotenv.config({
  path: "./.env",
});

import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { User } from "../models/user.model.js";


export const checkAuthentication = asyncHandler(async (req, res, next) => {
 
  const jwtTokenPresentInCookie = req.cookies.jwtToken ||  req.headers.authorization?.split(" ")[1];// or from cookies

  console.log("tokenHeader",req.headers.authorization?.split(" ")[1]);
  console.log("jwtToken",jwtTokenPresentInCookie);

  if (!jwtTokenPresentInCookie ) {
    throw new ApiError(401, "Unauthorized! Please Login or Register First ");
  }

  const decodedToken = jwt.verify(
    jwtTokenPresentInCookie,
    process.env.JWT_SECRET
  );

  console.log("decodedToken",decodedToken);

  if (!decodedToken) {
    throw new ApiError(
      401,
      "Unauthorized",
      "Invalid token ! Please login or register "
    );
  }

  const user = await User.findById(decodedToken.userId).select("-password ");

  if (!user) {
    throw new ApiError(
      401,
      "Unauthorized",
      "User not found ! Please login or register "
    );
  }

  req.user = user;
  next();
});
