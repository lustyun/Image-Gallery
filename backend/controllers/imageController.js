const Images = require("../models/imageModel");
const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");

// GET Images
const getImages = asyncHandler(async (req, res) => {
    const allPhotos = await Images.find({ user: req.user.id }).sort({
        createdAt: "descending",
    });
    res.send(allPhotos);
});

// Create Image
const createImage = asyncHandler(async (req, res) => {
    const photo = req.file.filename;
    const fileName = req.body.fileName;
    const user = req.user.id;

    const data = await Images.create({ user, photo, fileName });
    console.log("Uploaded Successfully...");
    console.log(data);
    res.send(data);
});

// DELETE Image
const deleteImage = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const image = await Images.findById(req.params.id)

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }
    
    // Make sure the logged in user matches the goal user
    if (image.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const data = await Images.findByIdAndRemove(id);
    if (!data) {
        return res.status(404).send("Image not found");
    }

    const filePath = path.join(
        __dirname,
        "..",
        "public",
        "uploads",
        data.photo
    );

    if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log("Error deleting file:", err);
                return res.status(500).send("Error deleting file");
            }

            console.log("Deleted Successfully...");
            console.log(data);
            res.send(data);
        });
    } else {
        console.log("File does not exist:", filePath);
        res.send(data);
    }
});

module.exports = {
    getImages,
    createImage,
    deleteImage,
};
