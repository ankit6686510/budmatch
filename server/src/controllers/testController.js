export const testCloudinaryUpload = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }
  
      res.status(200).json({
        message: "Image uploaded successfully",
        imageUrl: req.file.path, // Cloudinary returns the image URL
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  