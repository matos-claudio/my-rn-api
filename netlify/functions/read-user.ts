import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // Lembre-se: Em um cenário real, a senha deve ser hasheada.
  firebase_token: String,
});

const User = mongoose.model("User", UserSchema);

exports.handler = async (event: any) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  //   const dbConnection = process.env.DB_CONNECTION_STRING;
  await mongoose.connect(process.env.DB_CONNECTION_STRING);

//   const data = JSON.parse(event.body);

  try {
    const users = await User.find().select('-password'); // Excluindo a senha ao listar
    // const savedUser = await user.save();
    return {
      statusCode: 201,
      body: JSON.stringify(users),
    };
  } catch (error) {
    console.log(`Error::: ${JSON.stringify(error)}`)
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
};
