const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // MongoDB connection string - replace with your actual MongoDB URI
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/maxcar';

        const conn = await mongoose.connect(mongoURI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        return conn;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
