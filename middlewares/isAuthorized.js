import asyncHandler from "express-async-handler";
import Jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthorized = asyncHandler(async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null;
  if (token) {
    try {
      const decoded = Jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (user) {
        res
          .status(401)
          .json({ message: "Logged in user cannot access the register route" });
      } else {
        next();
      }
    } catch (error) {
      next();
    }
  } else {
    next();
  }
});

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null;

  if (token) {
    try {
      const decoded = Jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
});