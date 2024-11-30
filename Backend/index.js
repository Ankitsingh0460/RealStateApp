import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
const PORT = process.env.PORT || 8000;

dotenv.config();

const app = express();
app.use(express.json());
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connect to DataBase");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
