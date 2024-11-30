import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const PORT = process.env.PORT || 3001;
dotenv.config();

const app = express();

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connect to DataBase");
  })
  .catch((err) => {
    console.log(err);
  });
