import express from "express";

import { createListing } from "../controller/listing.controller.js";
import { tokenverify } from "../utils/tokenverify.js";
const router = express.Router();

router.post("/create", tokenverify, createListing);

export default router;
