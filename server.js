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

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Configure multer for image uploads
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
app.get('/api/cars', async (req, res) => {
    try {
        const cars = await Car.find({ status: 'available' }).sort({ createdAt: -1 });
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single car by ID
app.get('/api/cars/:id', async (req, res) => {
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
app.post('/api/cars', async (req, res) => {
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

        const car = new Car(carData);
        const savedCar = await car.save();

        res.status(201).json({
            message: 'Car added successfully!',
            car: savedCar
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update car
app.put('/api/cars/:id', async (req, res) => {
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
app.delete('/api/cars/:id', async (req, res) => {
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

// Serve static files
app.use('/uploads', express.static('uploads'));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));

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
