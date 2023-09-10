const { Router } = require("express");
const router = Router();
const uploadMiddleware = require("../middlewares/multerMiddleware");
const {
    getImages,
    createImage,
    deleteImage,
    updateImage,
} = require("../controllers/imageController");
const { protect } = require("../middlewares/authMiddleware");
// GET Images
router.get("/api/get", protect, getImages);

// Create Image
router.post(
    "/api/save",
    protect,
    uploadMiddleware.single("photo"),
    createImage
);

// Update title
router.put("/api/update/:id", protect, updateImage);

// DELETE Image
router.delete("/api/delete/:id", protect, deleteImage);

module.exports = router;
