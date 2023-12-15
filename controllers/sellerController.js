import asyncHandler from "express-async-handler";
import sellerCatalog from "../models/sellerCatalogModel.js";
export const createCatalog = asyncHandler(async (req, res) => {
  const { productName, price, category } = req.body;
  const sellerId = req.user._id;
  const newProduct = {
    productName,
    price,
    category,
  };
  let catalog = await sellerCatalog.findOne({ seller: sellerId });
  if (!catalog) {
    catalog = await sellerCatalog.create({ seller: sellerId, products: [] });
  }
  catalog.products.push(newProduct);
  await catalog.save();
  res.status(201).json({
    success: true,
    newProduct,
  });
});
