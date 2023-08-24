import mongoose from "mongoose";
import connectDB from "../db-conection";

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  unit: String,
  category: {
    id: Number,
    name: String,
  },
  imageUrl: String,
  description: String,
});

const Product = mongoose.model("Product", ProductSchema);

exports.handler = async (event: any) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  await connectDB();
  const data = JSON.parse(event.body);

  try {
    const product = new Product(data);
    const savedProduct = await product.save();
    return {
      statusCode: 201,
      body: JSON.stringify(savedProduct),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
};
