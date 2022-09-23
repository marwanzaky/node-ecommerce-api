require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const PORT = process.env.PORT || 8000;

// Connect to the MongoDB
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE.replace('<PASSWORD>', MONGO_DB_PASSWORD);

mongoose
    .connect(MONGO_DB_DATABASE)
    .then(() => console.log('DB connection successful!'));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));