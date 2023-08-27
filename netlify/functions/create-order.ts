import mongoose from "mongoose";
import connectDB from "../db-conection";

const OrderSchema = new mongoose.Schema({
  customer: {
    _id: String,
    name: String,
  },
  items: {
    _id: String,
    unit: String,
    quantity: Number,
    total: Number,
    imageUrl: String,
    name: String,
    price: Number,
  },
});

const Order = mongoose.model("Order", OrderSchema);

exports.handler = async (event: any) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  await connectDB();
  const data = JSON.parse(event.body);

  try {
    const order = new Order(data);
    const savedOrder= await order.save();
    return {
      statusCode: 201,
      body: JSON.stringify(savedOrder),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
};
