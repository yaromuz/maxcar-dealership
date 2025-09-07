require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/database');
const Car = require('./models/Car');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout');

// Connect to MongoDB (await connection)
let isDBConnected = false;
let useInMemoryStorage = false;

connectDB().then((conn) => {
    if (conn) {
        isDBConnected = true;
        console.log('Database connection established');
    } else {
        useInMemoryStorage = true;
        console.log('Using in-memory storage as fallback');
    }
}).catch(err => {
    console.error('MongoDB connection failed:', err.message);
    console.log('Using in-memory storage as fallback');
    useInMemoryStorage = true;
});

// Simplified middleware - just check if mongoose is connected
const checkDBConnection = (req, res, next) => {
    // If mongoose is connected, allow the request
    if (mongoose.connection.readyState === 1) {
        next();
    } else if (!isDBConnected && !useInMemoryStorage) {
        return res.status(503).json({
            error: 'Database connection not available',
            message: 'Please try again in a moment as the database is connecting...'
        });
    } else {
        next();
    }
};// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving - fixed for Vercel
app.use(express.static(path.join(__dirname)));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Debug route for CSS
app.get('/debug-css', (req, res) => {
    res.send(`
        <h1>CSS Debug</h1>
        <p>CSS Path: ${path.join(__dirname, 'css', 'style.css')}</p>
        <p>JS Path: ${path.join(__dirname, 'js')}</p>
        <p>Current directory: ${__dirname}</p>
        <link href="/css/style.css" rel="stylesheet">
        <style>body { background: red; color: white; }</style>
    `);
});

// Test route to check if server is working
app.get('/test', (req, res) => {
    res.json({
        message: 'Server is working!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        mongodb: process.env.MONGODB_URI ? 'configured' : 'not configured'
    });
});

// Debug route for database connection
app.get('/debug-db', async (req, res) => {
    try {
        const dbState = mongoose.connection.readyState;
        const mongoUri = process.env.MONGODB_URI;

        let testDoc = 'Connection not ready';
        try {
            testDoc = await Car.countDocuments();
        } catch (e) {
            testDoc = `Error: ${e.message}`;
        }

        res.json({
            mongooseState: dbState,
            stateDescription: {
                0: 'disconnected',
                1: 'connected',
                2: 'connecting',
                3: 'disconnecting'
            }[dbState],
            carCount: testDoc,
            connectionHost: mongoose.connection.host || 'Not connected',
            connectionName: mongoose.connection.name || 'Not connected',
            envVarConfigured: mongoUri ? 'YES' : 'NO',
            envVarPrefix: mongoUri ? mongoUri.substring(0, 25) + '...' : 'Not set'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            mongooseState: mongoose.connection.readyState,
            envVarConfigured: process.env.MONGODB_URI ? 'YES' : 'NO'
        });
    }
});// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Routes

// Get all cars
app.get('/api/cars', checkDBConnection, async (req, res) => {
    try {
        const cars = await Car.find({ status: 'available' }).sort({ createdAt: -1 });
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single car by ID
app.get('/api/cars/:id', checkDBConnection, async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new car
app.post('/api/cars', checkDBConnection, async (req, res) => {
    try {
        console.log('=== CAR CREATION DEBUG ===');
        console.log('Mongoose connection state:', mongoose.connection.readyState);
        console.log('Connection host:', mongoose.connection.host);
        console.log('Environment check:', process.env.MONGODB_URI ? 'URI configured' : 'URI missing');

        const carData = {
            make: req.body.make,
            model: req.body.model,
            year: parseInt(req.body.year),
            engine: req.body.engine,
            horsepower: req.body.horsepower,
            transmission: req.body.transmission,
            drivetrain: req.body.drivetrain,
            fuelType: req.body.fuelType,
            mpg: req.body.mpg,
            mileage: req.body.mileage,
            exteriorColor: req.body.exteriorColor,
            interiorColor: req.body.interiorColor,
            description: req.body.description,
            keyFeatures: req.body.keyFeatures ? req.body.keyFeatures.split(',').map(f => f.trim()) : [],
            price: parseFloat(req.body.price),
            imageAddress: req.body.imageAddress || '/uploads/default-car.jpg'
        };

        console.log('Creating car with data:', JSON.stringify(carData, null, 2));

        const car = new Car(carData);
        console.log('Car model created, attempting to save...');

        const savedCar = await car.save();
        console.log('Car saved successfully:', savedCar._id);

        res.status(201).json({
            message: 'Car added successfully!',
            car: savedCar
        });
    } catch (error) {
        console.error('=== CAR CREATION ERROR ===');
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        console.error('Mongoose state during error:', mongoose.connection.readyState);

        res.status(400).json({ message: error.message });
    }
});

// Update car
app.put('/api/cars/:id', checkDBConnection, async (req, res) => {
    try {
        const carData = {
            make: req.body.make,
            model: req.body.model,
            year: parseInt(req.body.year),
            engine: req.body.engine,
            horsepower: req.body.horsepower,
            transmission: req.body.transmission,
            drivetrain: req.body.drivetrain,
            fuelType: req.body.fuelType,
            mpg: req.body.mpg,
            mileage: req.body.mileage,
            exteriorColor: req.body.exteriorColor,
            interiorColor: req.body.interiorColor,
            description: req.body.description,
            keyFeatures: req.body.keyFeatures ? req.body.keyFeatures.split(',').map(f => f.trim()) : [],
            price: parseFloat(req.body.price),
            imageAddress: req.body.imageAddress || '/uploads/default-car.jpg'
        };

        const car = await Car.findByIdAndUpdate(req.params.id, carData, { new: true });
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        res.json({
            message: 'Car updated successfully!',
            car: car
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete car
app.delete('/api/cars/:id', checkDBConnection, async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json({ message: 'Car deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// EJS Routes
app.get('/', async (req, res) => {
    try {
        const cars = await Car.find({ status: 'available' }).sort({ createdAt: -1 }).limit(6);
        res.render('index', { cars, title: 'MaxCar - Premium Car Dealership' });
    } catch (error) {
        res.render('index', { cars: [], title: 'MaxCar - Premium Car Dealership' });
    }
});

app.get('/buy', async (req, res) => {
    try {
        const cars = await Car.find({ status: 'available' }).sort({ createdAt: -1 });
        res.render('buy', { cars, title: 'Buy Cars - MaxCar' });
    } catch (error) {
        res.render('buy', { cars: [], title: 'Buy Cars - MaxCar' });
    }
});

app.get('/sell', (req, res) => {
    res.render('sell', { title: 'Sell Your Car - MaxCar' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us - MaxCar' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us - MaxCar' });
});

app.get('/add-car', (req, res) => {
    res.render('add-car', { title: 'Add New Car - MaxCar' });
});

app.get('/car-success', (req, res) => {
    res.render('car-success', { title: 'Car Added Successfully - MaxCar' });
});

app.get('/car-detail/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).render('404', { title: 'Car Not Found - MaxCar' });
        }
        res.render('car-detail', { car, title: `${car.year} ${car.make} ${car.model} - MaxCar` });
    } catch (error) {
        res.status(404).render('404', { title: 'Car Not Found - MaxCar' });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log('Unhandled Promise Rejection:', err.message);
    // Keep the server running
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception:', err.message);
    // Keep the server running
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    mongoose.connection.close();
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    mongoose.connection.close();
    process.exit(0);
});
