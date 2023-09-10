const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const uploadRoutes = require("./routes/uploadRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();
connectDB();

const corsOptions = {
    origin: "http://localhost:3000", // Replace with your frontend's URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(uploadRoutes);
app.use(userRoutes);

app.listen(port, () =>
    console.log(`Server started on port ${port} https://localhost:5000`)
);
