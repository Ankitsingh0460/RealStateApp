import express from "express";

import {
  createListing,
  deleteListing,
  getListing,
  getListings,
  updateListing,
} from "../controller/listing.controller.js";
import { tokenverify } from "../utils/tokenverify.js";

const router = express.Router();

router.post("/create", tokenverify, createListing);
router.delete("/delete/:id", tokenverify, deleteListing);
router.post("/update/:id", tokenverify, updateListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);

export default router;
