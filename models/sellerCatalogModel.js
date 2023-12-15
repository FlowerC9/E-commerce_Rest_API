import mongoose from "mongoose";
import Product from "./productModel.js";
const sellerCatalogSchema=new mongoose.Schema({
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    products:[Product.Schema],
})
const sellerCatalog=mongoose.model('sellerCatalog',sellerCatalogSchema);

export default sellerCatalog;