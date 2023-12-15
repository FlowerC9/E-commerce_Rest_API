import express from 'express';

import  Router  from 'express';
import { isAuthorizedSeller } from '../middlewares/isAuthorized.js';
import { createCatalog } from '../controllers/sellerController.js';
const router=express.Router();

router.route('/create-catalog').post(isAuthorizedSeller,createCatalog);

export default router;