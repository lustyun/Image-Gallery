const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const uploadRoutes = require("./routes/uploadRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(uploadRoutes);
app.use(userRoutes);

app.listen(port, () =>
    console.log(`Server started on port ${port} https://localhost:5000`)
);
