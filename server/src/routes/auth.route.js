import { Router } from "express";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const router = Router();

router.get("/register", (req, res) => {
  res
    .status(200)
    .json(
      new ApiResponse(201, { name: "lalit" }, "Nice Successfully Registered")
    );
});
router.route("/login").get((r, rs) => {
  throw new ApiError(404, "Nice Error");

  rs.status(200).send({
    message: "success login",
  });
});

export default router;
