import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user-routes";

const app = express();
const PORT = 3000;

mongoose.connect("mongodb+srv://clouddevmob:2023_app@cluster0.adtporo.mongodb.net/");
const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Erro na conexão com o MongoDB:", error);
});

db.once("open", () => {
  console.log("Conexão bem-sucedida com o MongoDB!");
});

app.use(express.json());
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
