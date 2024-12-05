import express from "express";
import { update, deleteUser } from "../controller/user.controller.js";
import { tokenverify } from "../utils/tokenverify.js";

const router = express.Router();

router.post("/update/:id", tokenverify, update);
router.delete("/delete/:id", tokenverify, deleteUser);

export default router;
