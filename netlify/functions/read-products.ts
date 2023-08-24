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
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  await connectDB();

  try {
    const products = await Product.find();
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
};
