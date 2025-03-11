import cloudinary from "cloudinary";

// Configure Cloudinary (Make sure your env variables are set)
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.v2.uploader.upload_stream(
      { folder: "budmatch" },
      (error, uploadResult) => {
        if (error) return res.status(500).json({ message: "Upload failed", error });

        res.status(200).json({ message: "Upload successful", url: uploadResult.secure_url });
      }
    ).end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
