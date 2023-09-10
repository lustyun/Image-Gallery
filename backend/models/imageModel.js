const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        photo: {
            type: String,
            required: true,
        },
        fileName: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Uploads", uploadSchema);
