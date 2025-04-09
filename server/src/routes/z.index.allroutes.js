import { Router } from "express";
import authRoutes from "./auth.route.js";
import jobPostRoutes from "./jobPost.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/jobpost",jobPostRoutes);

export default router;
