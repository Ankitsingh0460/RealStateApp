import express from "express";
import {
  update,
  deleteUser,
  getUserListing,
} from "../controller/user.controller.js";
import { tokenverify } from "../utils/tokenverify.js";

const router = express.Router();

router.post("/update/:id", tokenverify, update);
router.delete("/delete/:id", tokenverify, deleteUser);
router.get("/listing/:id", tokenverify, getUserListing);

export default router;
