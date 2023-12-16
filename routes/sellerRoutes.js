import express from 'express';

import  Router  from 'express';
import { isAuthorizedSeller } from '../middlewares/isAuthorized.js';
import { createCatalog,getOrders } from '../controllers/sellerController.js';
const router=express.Router();

router.route('/create-catalog').post(isAuthorizedSeller,createCatalog);

router.route('/orders').get(isAuthorizedSeller,getOrders);
export default router;