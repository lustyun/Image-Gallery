const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const uploadMiddleware = require("../middlewares/multerMiddleware");
const Images = require("../models/image");
const fs = require("fs");
const path = require("path");

// Registration endpoint
router.post("/api/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// Login endpoint
router.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username and password (simplified for this example)
        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        res.status(200).json({ message: "Login successful." });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(400).json({ message: "Login failed." });
    }
});

// GET Images
router.get("/api/get", async (req, res) => {
    const allPhotos = await Images.find().sort({ createdAt: "descending" });
    res.send(allPhotos);
});

// Create Image
router.post("/api/save", uploadMiddleware.single("photo"), (req, res) => {
    const photo = req.file.filename;

    console.log(photo);

    Images.create({ photo })
        .then((data) => {
            console.log("Uploaded Successfully...");
            console.log(data);
            res.send(data);
        })
        .catch((err) => console.log(err));
});

// DELETE Image
router.delete("/api/delete/:id", (req, res) => {
    const id = req.params.id;

    Images.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                return res.status(404).send("Image not found");
            }

            // Get the file path of the image to be deleted
            const filePath = path.join(
                __dirname,
                "public",
                "uploads",
                data.photo
            );

            // Use fs.unlink to delete the file from the local file system
            if (fs.existsSync(filePath)) {
                // Use fs.unlink to delete the file from the local file system
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
});

module.exports = router;
