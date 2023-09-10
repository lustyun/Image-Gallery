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

// Update Image Filename
const updateImage = asyncHandler(async (req, res) => {
    console.log("Update route reached");
    const id = req.params.id;
    const newFilename = req.body; // Assuming you send the new filename in the request body

    console.log("req body", newFilename);
    const image = await Images.findById(id);

    if (!image) {
        return res.status(404).send("Image not found");
    }

    // Check if the logged-in user has the right to update this image
    if (image.user.toString() !== req.user.id) {
        return res.status(401).send("User not authorized");
    }

    // Update the image's filename
    image.fileName = newFilename.fileName;

    // Save the updated image
    await image.save();

    console.log("Updated Filename Successfully...");
    console.log(image);

    res.send(image);
});

// DELETE Image
const deleteImage = asyncHandler(async (req, res) => {
    console.log("Delete route reached");
    const id = req.params.id;

    const image = await Images.findById(id);

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
    updateImage,
};
