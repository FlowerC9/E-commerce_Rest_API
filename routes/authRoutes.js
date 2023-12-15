import express from "express";
import { registerUser, authUser } from "../controllers/authController.js";
import { isAuthorized } from "../middlewares/isAuthorized.js";
import { Router } from "express";

const router = Router();

router.route("/register").post(isAuthorized,registerUser);


router.post("/login", authUser);

export default router;