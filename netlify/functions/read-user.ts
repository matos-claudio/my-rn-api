import mongoose from "mongoose";
import connectDB from "../db-conection";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  firebase_token: String,
});

const User = mongoose.model("User", UserSchema);

exports.handler = async (event: any) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  await connectDB();

  try {
    const users = await User.find().select("-password");
    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
};
