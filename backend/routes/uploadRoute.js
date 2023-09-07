const { Router } = require("express");
const router = Router();
const User = require("../models/users");
const uploadMiddleware = require("../middlewares/multerMiddleware");
const Images = require("../models/image");

// Corrected route path with a leading slash
router.post("/api/save", (req, res) => {
    res.send("Handling GET requests...");
});

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

router.get("/api/get", async (req, res) => {
    const allPhotos = await Images.find().sort({ createdAt: "descending" });
    res.send(allPhotos);
});

router.post("/api/save", uploadMiddleware.single("photo"), (req, res) => {
    const photo = req.file.filename;

    console.log(photo);

    UploadModel.create({ photo })
        .then((data) => {
            console.log("Uploaded Successfully...");
            console.log(data);
            res.send(data);
        })
        .catch((err) => console.log(err));
});

module.exports = router;
