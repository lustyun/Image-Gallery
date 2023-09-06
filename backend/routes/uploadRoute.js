const { Router } = require("express");
const router = Router();

// Corrected route path with a leading slash
router.post("/api/save", (req, res) => {
    res.send("Handling GET requests...");
});

module.exports = router;
