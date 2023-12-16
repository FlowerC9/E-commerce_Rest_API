import express from "express";
import Router from "express";
import { allSellers, getCatalog,createOrder } from "../controllers/buyerController.js";
import { isLoggedIn } from "../middlewares/isAuthorized.js";
const router = Router();

router.route("/list-of-sellers").get(isLoggedIn, allSellers);

router.route("/seller-catalog/:seller_id").get(isLoggedIn, getCatalog);

router.route("/create-order/:seller_id").post(isLoggedIn,createOrder);

export default router;
