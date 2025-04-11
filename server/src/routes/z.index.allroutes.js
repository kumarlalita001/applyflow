import { Router } from "express";
import authRoutes from "./auth.route.js";
import jobPostRoutes from "./jobPost.route.js";
import rateLimit from "express-rate-limit";
import ApiError from "../utils/apiError.js";

const router = Router();

// Rate Limiting
const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10,
  handler: (req, res) => {
    // res.status(429).json({
    //   error: "Too many login/signup attempts from this IP, try again later."
    // });
    throw new ApiError(429,'Too many login/signup attempts from this IP, try again later');
  },
});

const jobLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 20,
  handler: (req, res) => {
    throw new ApiError(429,'Too many job attempts from this IP, try again later')
  },
});

router.use("/auth",authLimiter ,authRoutes);
router.use("/jobpost",jobLimiter, jobPostRoutes);

export default router;
