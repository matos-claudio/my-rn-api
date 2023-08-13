import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  firebase_token: {
    type: String,
    required: false,
  },
});

export default mongoose.model("User", userSchema);
