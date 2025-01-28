import mongoose from "mongoose";

const earbudListingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  brand: {
    type: String,
    required: true,
    enum: ["Apple", "Samsung", "Sony", "Other"],
  },
  model: { type: String, required: true },
  side: { type: String, required: true, enum: ["left", "right"] },
  condition: {
    type: String,
    enum: ["new", "used", "damaged"],
    default: "used",
  },
  price: { type: Number, required: true, min: 0 },
  imageUrl: String,
  status: {
    type: String,
    enum: ["available", "matched", "sold"],
    default: "available",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("EarbudListing", earbudListingSchema);
