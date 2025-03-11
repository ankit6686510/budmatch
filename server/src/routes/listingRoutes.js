import express from "express";
import { protect } from "../middleware/auth.js";
import { updateListing } from "../controllers/listingController.js";


import { upload } from "../middleware/uploadMiddleware.js";

import { uploadImage } from "../controllers/uploadController.js"; // Create this controller


import {
  createListing,
  getListings,
  deleteListing,
} from "../controllers/listingController.js";

const router = express.Router();

router.post("/", protect, createListing);
router.get("/", getListings);
router.delete("/:id", protect, deleteListing);
router.put("/:id", protect, updateListing);
router.post("/", protect, upload.single("image"), createListing);

router.post("/test-upload", upload.single("image"), uploadImage); //for testing cloudinary

export default router;
