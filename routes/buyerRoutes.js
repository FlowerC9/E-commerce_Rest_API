import express from 'express';
import Router from 'express';
import { allSellers,getCatalog } from '../controllers/buyerController.js';
import { isLoggedIn } from '../middlewares/isAuthorized.js';
const router=Router();

router.route('/list-of-sellers').get(isLoggedIn,allSellers);

router.route('/seller-catalog/:seller_id').get(isLoggedIn,getCatalog);

export default router;