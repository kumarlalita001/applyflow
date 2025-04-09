import { Router } from "express";

import { getCurrentUser, login, logout, register } from "../controllers/auth.controller.js";
import { checkAuthentication } from "../middlewares/auth.middleware.js";



const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/check-auth").post(checkAuthentication,getCurrentUser);

export default router;
