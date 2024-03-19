import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter product title"],
  },
  description: {
    type: String,
    required: [true, "Please enter description"],
  },
  productImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    default: "Audio",
  },
});

export const Product = mongoose.model("Product", schema);
