import express from "express";

import {
  createListing,
  deleteListing,
  updateListing,
} from "../controller/listing.controller.js";
import { tokenverify } from "../utils/tokenverify.js";

const router = express.Router();

router.post("/create", tokenverify, createListing);
router.delete("/delete/:id", tokenverify, deleteListing);
router.post("/update/:id", tokenverify, updateListing);

export default router;
