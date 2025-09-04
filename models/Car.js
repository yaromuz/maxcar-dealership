const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    // Basic Information
    make: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear() + 1
    },

    // Engine & Performance
    engine: {
        type: String,
        required: true,
        trim: true
    },
    horsepower: {
        type: String,
        required: true,
        trim: true
    },
    transmission: {
        type: String,
        required: true,
        trim: true
    },
    drivetrain: {
        type: String,
        required: true,
        trim: true
    },

    // Fuel & Efficiency
    fuelType: {
        type: String,
        required: true,
        trim: true
    },
    mpg: {
        type: String,
        required: true,
        trim: true
    },

    // Condition & Appearance
    mileage: {
        type: String,
        required: true,
        trim: true
    },
    exteriorColor: {
        type: String,
        required: true,
        trim: true
    },
    interiorColor: {
        type: String,
        required: true,
        trim: true
    },

    // Additional Information
    description: {
        type: String,
        required: true,
        trim: true
    },
    keyFeatures: [{
        type: String,
        trim: true
    }],

    // Media
    imageAddress: {
        type: String, // Image URL address
        trim: true,
        default: '/uploads/default-car.jpg'
    },

    // Pricing
    price: {
        type: Number,
        required: true,
        min: 0
    },

    // Status
    status: {
        type: String,
        enum: ['available', 'sold', 'pending'],
        default: 'available'
    },

    // Metadata
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
carSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Create a virtual for the car's full name
carSchema.virtual('fullName').get(function () {
    return `${this.year} ${this.make} ${this.model}`;
});

// Ensure virtual fields are serialized
carSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Car', carSchema);
