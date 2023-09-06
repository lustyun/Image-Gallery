const express = require('express');
const connectDB = require('./config/db');
const port = process.env.PORT || 3000;
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(port, () => console.log(`Server started on port ${port} https://localhost:3000` ));
