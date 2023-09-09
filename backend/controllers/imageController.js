const Images = require("../models/imageModel");
const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");

// GET Images
const getImages = asyncHandler(async (req, res) => {
    const allPhotos = await Images.find().sort({ createdAt: "descending" });
    res.send(allPhotos);
});

// Create Image
const createImage = asyncHandler(async (req, res) => {
    const photo = req.file.filename;
    const fileName = req.body.fileName;

    const data = await Images.create({ photo, fileName });
    console.log("Uploaded Successfully...");
    console.log(data);
    res.send(data);
});

// DELETE Image
const deleteImage = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const data = await Images.findByIdAndRemove(id);
    if (!data) {
        return res.status(404).send("Image not found");
    }

    const filePath = path.join(__dirname, "..", "public", "uploads", data.photo);

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
