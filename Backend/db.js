const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/test"

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB Successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        // Handle the error appropriately
    }
}

module.exports = connectToMongo;
