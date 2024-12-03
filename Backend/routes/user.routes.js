import express from "express";
import { test, update } from "../controller/user.controller.js";
import { tokenverify } from "../utils/tokenverify.js";

const router = express.Router();

router.get("/", test);
router.post("/update/:id", tokenverify, update);

export default router;
