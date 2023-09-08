const express = require("express");
const cors = require('cors')
const connectDB = require("./config/db");
const port = process.env.PORT || 3000;
const uploadRoute = require("./routes/uploadRoute");
require("dotenv").config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(uploadRoute);

app.listen(port, () =>
    console.log(`Server started on port ${port} https://localhost:3000`)
);
