import asyncHandler from 'express-async-handler';
import express from 'express';
import User from '../models/userModel.js';
import sellerCatalog from '../models/sellerCatalogModel.js';
export const allSellers=asyncHandler(async(req,res)=>{
    const sellers=await User.find({userType:'seller'});
    res.status(200).json({
        sellers,
    });
});


export const getCatalog=asyncHandler(async(req,res)=>{
    const sellerId=req.params.seller_id;
    const catalog=await sellerCatalog.findOne({seller:sellerId}).populate('seller','username');
    if(!catalog){
        res.status(404).json({
            success:false,
            message:'Seller Catalog Not found',
        })
    }
    else{
        res.status(200).json({
            catalog
        })
    }
});