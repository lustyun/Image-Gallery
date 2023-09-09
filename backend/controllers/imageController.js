const Images = require("../models/image");
const fs = require("fs");
const path = require("path");

// GET Images
const getImages = async (req, res) => {
    const allPhotos = await Images.find().sort({ createdAt: "descending" });
    res.send(allPhotos);
};

// Create Image
const createImage = (req, res) => {
    const photo = req.file.filename;
    const fileName = req.body.fileName;
    console.log(photo);

    Images.create({ photo, fileName })
        .then((data) => {
            console.log("Uploaded Successfully...");
            console.log(data);
            res.send(data);
        })
        .catch((err) => console.log(err));
};

// DELETE Image
const deleteImage = (req, res) => {
    const id = req.params.id;

    Images.findByIdAndRemove(id)
        .then((data) => {
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
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
};

module.exports = {
    getImages,
    createImage,
    deleteImage,
};
