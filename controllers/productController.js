import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Product } from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getAllProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.find();

  res.status(200).json({
    success: true,
    product,
  });
});

export const createProduct = catchAsyncError(async (req, res, next) => {
  const { title, description, price, category } = req.body;

  if (!title || !description || !category || !price)
    return next(new ErrorHandler("Please add all fields", 400));

  // const file = req.file;

  const product = await Product.create({
    title,
    description,
    category,
    price,
    productImage: {
      public_id: "temp1",
      url: "url1",
    },
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});
