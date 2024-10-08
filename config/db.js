// config/db.js
require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB using the URL from the .env file
mongoose.connect(process.env.MONGOURL)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.error('DB Error', err));

module.exports = mongoose;