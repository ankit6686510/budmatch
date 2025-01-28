import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Invalid email"],
  },
  password: { type: String, required: true, select: false },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true, default: [0, 0] }, // Default to [0, 0]
  },
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "EarbudListing" }],
  rating: { type: Number, default: 4.5, min: 1, max: 5 },
  authProvider: {
    type: String,
    enum: ["email", "google", "apple"],
    default: "email",
  },
});


// Geospatial index for proximity-based matching
userSchema.index({ location: "2dsphere" });

// Password hashing middleware
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Password matching method (for login)
userSchema.methods.matchPassword = async function(enteredPassword) {
  if (!enteredPassword) {
    return false;
  }
  return await bcrypt.compare(enteredPassword, this.password);
};


export default mongoose.model("User", userSchema);















// import mongoose from "mongoose";
// import validator from "validator";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: [true, "Name is required"] },
//   email: {
//     type: String,
//     required: [true, "Email is required"],
//     unique: true,
//     validate: [validator.isEmail, "Invalid email"],
//   },
//   password: { type: String, required: true, select: false },
//   location: {
//     type: { type: String, default: "Point" },
//     coordinates: [Number], // [longitude, latitude]
//   },
//   listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "EarbudListing" }],
//   rating: { type: Number, default: 4.5, min: 1, max: 5 },
//   authProvider: {
//     type: String,
//     enum: ["email", "google", "apple"],
//     default: "email",
//   },
// });

// // Geospatial index for proximity-based matching
// userSchema.index({ location: "2dsphere" });

// export default mongoose.model("User", userSchema);
