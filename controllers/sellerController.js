import asyncHandler from "express-async-handler";
import sellerCatalog from "../models/sellerCatalogModel.js";
import Order from "../models/orderModel.js";
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


export const getOrders = asyncHandler(async (req, res) => {
  const sellerId = req.user._id;
  const orders = await Order.find({ seller: sellerId });

  await Promise.all(
    orders.map(async (order) => {
      await order.populate("seller", "username");
      await order.populate("buyer", "username");
    })
  );

  if (orders.length > 0) {
    res.status(200).json({
      orders,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "There are no orders",
    });
  }
});
