import EarbudListing from "../models/EarbudListing.js";

export const createListing = async (req, res) => {
  try {
    const { brand, model, side, condition, price } = req.body;
    const imageUrl = req.file?.path; // Get Cloudinary URL

    const listing = await EarbudListing.create({
      userId: req.user._id,
      brand,
      model,
      side,
      condition,
      price,
      image: imageUrl, // Store image URL in DB
    });

    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// export const createListing = async (req, res) => {
//     try {
//       const { brand, model, side, condition, price } = req.body;
//       const listing = await EarbudListing.create({
//         userId: req.user._id,
//         brand,
//         model,
//         side,
//         condition,
//         price,
//       });
//       res.status(201).json(listing);
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   };
  
//getlistings
export const getListings = async (req, res) => {
  try {
    const { brand, model, side, page = 1, limit = 10, sort = "createdAt" } = req.query;
    const filters = {};
    
    if (brand) filters.brand = { $regex: brand, $options: "i" }; // Case-insensitive search
    if (model) filters.model = { $regex: model, $options: "i" };
    if (side) filters.side = side;

    const listings = await EarbudListing.find(filters)
      .populate("userId", "name rating")
      .sort({ [sort]: -1 }) // Sorting by newest first
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};






  // export const getListings = async (req, res) => {
  //   try {
  //     const { brand, model, side, page = 1, limit = 10 } = req.query;
  //     const filters = {};
  //     if (brand) filters.brand = brand;
  //     if (model) filters.model = model;
  //     if (side) filters.side = side;
  
  //     const listings = await EarbudListing.find(filters)
  //       .populate('userId', 'name rating')
  //       .skip((page - 1) * limit)
  //       .limit(parseInt(limit));
  
  //     res.json(listings);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Server error', error: error.message });
  //   }
  // };
  
  export const deleteListing = async (req, res) => {
    try {
      const { id } = req.params;
      const listing = await EarbudListing.findById(id);
  
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
  
      if (listing.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized to delete this listing" });
      }
  
      await listing.deleteOne();
      res.status(200).json({ message: "Listing deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  





  // export const deleteListing = async (req, res) => {
  //   try {
  //     const { id } = req.params; // Get listing ID from URL
  //     const listing = await EarbudListing.findById(id);
  
  //     if (!listing) {
  //       return res.status(404).json({ message: "Listing not found" });
  //     }
  
  //     // Ensure the user deleting the listing is the owner
  //     if (listing.userId.toString() !== req.user._id.toString()) {
  //       return res
  //         .status(403)
  //         .json({ message: "Not authorized to delete this listing" });
  //     }
  
  //     await EarbudListing.deleteOne({ _id: id });  // ✅ Correct method
  //     res.status(200).json({ message: "Listing deleted successfully" });
  //   } catch (error) {
  //     res.status(500).json({ message: "Server error", error: error.message });
  //   }
  // };
  
export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await EarbudListing.findById(id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this listing" });
    }

    const updatedListing = await EarbudListing.findByIdAndUpdate(id, req.body, { new: true });

    res.json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


//testing cloudinary
import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import { testCloudinaryUpload } from "../controllers/testController.js";

const router = express.Router();

router.post("/test-upload", upload.single("image"), testCloudinaryUpload);

export default router;
