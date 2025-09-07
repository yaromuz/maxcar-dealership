const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // For Vercel deployment - use MongoDB Atlas
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/maxcar';

        console.log('Attempting to connect to:', mongoURI.includes('mongodb+srv') ? 'MongoDB Atlas' : 'Local MongoDB');

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
        console.log('Will try to create in-memory storage as fallback...');

        // Create a simple in-memory storage as fallback
        global.carsStorage = global.carsStorage || [];
        console.log('Using in-memory storage for cars');
        return null;
    }
};

module.exports = connectDB;
