import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import listRouter from "./routes/listing.routes.js";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 8000;

dotenv.config();

const app = express();
app.use(cookieParser());
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
app.use("/api/create", listRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
