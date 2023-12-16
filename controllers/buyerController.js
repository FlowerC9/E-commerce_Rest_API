import asyncHandler from "express-async-handler";
import express from "express";
import User from "../models/userModel.js";
import sellerCatalog from "../models/sellerCatalogModel.js";
import Order from "../models/orderModel.js";
export const allSellers = asyncHandler(async (req, res) => {
  const sellers = await User.find({ userType: "seller" });
  res.status(200).json({
    sellers,
  });
});

export const getCatalog = asyncHandler(async (req, res) => {
  const sellerId = req.params.seller_id;
  const catalog = await sellerCatalog.findOne({ seller: sellerId }).populate("seller", "username");
  if (!catalog) {
    res.status(404).json({
      success: false,
      message: "Seller Catalog Not found",
    });
  } else {
    res.status(200).json({
      catalog,
    });
  }
});


export const createOrder = asyncHandler(async (req, res) => {
    const sellerId = req.params.seller_id;
    const { products } = req.body;
    const buyerId=req.user._id;
    const catalog = await sellerCatalog.findOne({ seller:sellerId});

    if (!catalog) {
        return res.status(404).json({
            success: false,
            message: 'Seller Catalog Not Found',
        });
    }
    const orderedProducts = [];
    let totalAmount = 0;

    for (const { productName, price, category } of products) {
        const catalogProduct = catalog.products.find((product) => product.productName === productName);

        if (!catalogProduct || catalogProduct.price !== price) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Product Information',
            });
        }

        orderedProducts.push({
            productName,
            price,
            category,
        });

        totalAmount += price;
    }
    const order = await Order.create({
        buyer: buyerId,
        seller: sellerId,
        products: orderedProducts,
        totalAmount,
    });

    await order.populate("buyer", "username");
    await order.populate('seller','username');
    res.status(201).json({
        success: true,
        order,
    });
});
