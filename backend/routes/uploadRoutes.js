const { Router } = require("express");
const router = Router();
const uploadMiddleware = require("../middlewares/multerMiddleware");
const {
    getImages,
    createImage,
    deleteImage,
} = require("../controllers/imageController");

// GET Images
router.get("/api/get", getImages);

// Create Image
router.post("/api/save", uploadMiddleware.single("photo"), createImage);

// DELETE Image
router.delete("/api/delete/:id", deleteImage);

module.exports = router;
