const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // For Vercel deployment - use MongoDB Atlas
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/maxcar';

        // Serverless-friendly options
        const conn = await mongoose.connect(mongoURI, {
            bufferCommands: true, // Enable buffering for better reliability
            serverSelectionTimeoutMS: 30000, // Increase timeout for serverless
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        return conn;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        // Don't crash the serverless function - just log the error
        return null;
    }
};

module.exports = connectDB;
