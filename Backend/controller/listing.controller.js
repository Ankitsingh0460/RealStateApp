import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Listing Created",
      listing,
    });
  } catch (error) {
    next(error);
  }
};
