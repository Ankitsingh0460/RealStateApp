import express from "express";

import { create } from "../controller/listing.controller.js";
import { tokenverify } from "../utils/tokenverify.js";
const router = express.Router();

router.post("/create", tokenverify, create);

export default router;
