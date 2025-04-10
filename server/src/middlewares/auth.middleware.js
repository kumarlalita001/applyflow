import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { User } from "../models/user.model.js";

export const checkAuthentication = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // either in headers 
  const jwtTokenPresentInCookie = req.cookies.jwtToken; // or from cookies

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
