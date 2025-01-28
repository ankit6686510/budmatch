import EarbudListing from "../models/EarbudListing.js";

export const createListing = async (req, res) => {
    try {
      const { brand, model, side, condition, price } = req.body;
      const listing = await EarbudListing.create({
        userId: req.user._id,
        brand,
        model,
        side,
        condition,
        price,
      });
      res.status(201).json(listing);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  

  export const getListings = async (req, res) => {
    try {
      const { brand, model, side, page = 1, limit = 10 } = req.query;
      const filters = {};
      if (brand) filters.brand = brand;
      if (model) filters.model = model;
      if (side) filters.side = side;
  
      const listings = await EarbudListing.find(filters)
        .populate('userId', 'name rating')
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      res.json(listings);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the listing ID is passed as a URL parameter
    const listing = await EarbudListing.findById(id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Ensure the user deleting the listing is the owner
    if (listing.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this listing" });
    }

    await listing.remove();
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
