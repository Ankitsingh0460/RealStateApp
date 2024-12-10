import express from "express";
import tokenverify from "../utils/tokenverify.js";
const router = express.Router();

router.post("/create", tokenverify, create);

export default router;
