import express from "express";
import { createProduct, getAllProduct } from "../controllers/productController.js";

const router = express.Router();

router.route("/products").get(getAllProduct)
router.route("/createproduct").post(createProduct)

export default router;