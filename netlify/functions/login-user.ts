import mongoose from "mongoose";
import bcrypt from "bcrypt";
import connectDB from "../db-conection";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // Lembre-se: Em um cenário real, a senha deve ser hasheada.
  firebase_token: String,
});

const User = mongoose.model("User", UserSchema);

exports.handler = async (event: any, context: any) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  await connectDB();

  const { email, password } = JSON.parse(event.body);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid email or password" }),
      };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password!);

    if (!isPasswordValid) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid email or password" }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Login successful!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
};
