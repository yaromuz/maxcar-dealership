# MaxCar Dealership - MongoDB Integration Setup

## Prerequisites
1. **Node.js** (v14 or higher) - Download from https://nodejs.org/
2. **MongoDB** - Download from https://www.mongodb.com/try/download/community
3. **Git** (optional) - For version control

## Installation Steps

### 1. Install Dependencies
Open your terminal/command prompt in the project directory and run:
```bash
npm install
```

### 2. Start MongoDB
Make sure MongoDB is running on your system:
- **Windows**: MongoDB should start automatically if installed as a service
- **Mac/Linux**: Run `mongod` in terminal

### 3. Configure Environment
The `.env` file is already created with default settings:
- MongoDB URI: `mongodb://localhost:27017/maxcar`
- Server Port: `3000`

### 4. Start the Server
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

### 5. Access the Application
Open your browser and go to: `http://localhost:3000`

## Features

### 🚗 Car Management
- **Add Car**: Complete form with all car specifications
- **View Cars**: Browse all available cars
- **Car Details**: Individual car pages with full information
- **Image Upload**: Support for multiple car images

### 📊 Database Schema
Cars are stored with the following information:
- Basic Info: Make, Model, Year
- Engine & Performance: Engine, Horsepower, Transmission, Drivetrain
- Fuel & Efficiency: Fuel Type, MPG
- Condition: Mileage, Exterior/Interior Colors
- Description & Key Features
- Images & Pricing
- Status & Metadata

### 🌐 API Endpoints
- `GET /api/cars` - Get all available cars
- `GET /api/cars/:id` - Get specific car details
- `POST /api/cars` - Add new car (with image upload)
- `PUT /api/cars/:id` - Update car information
- `DELETE /api/cars/:id` - Remove car from inventory

### 📱 Pages
- **Home** (`buy.html`) - Car listings with animated hero
- **Add Car** (`add-car.html`) - Comprehensive car entry form
- **Success** (`car-success.html`) - Confirmation after adding car
- **Car Details** (`car-detail.html`) - Individual car information
- **About** (`index.html`) - Company information
- **Sell** (`sell.html`) - Selling services
- **Contact** (`contact.html`) - Contact information

## File Structure
```
maxcar/
├── models/
│   └── Car.js              # MongoDB car schema
├── config/
│   └── database.js         # Database connection
├── uploads/                # Car images storage
├── js/
│   ├── navigation.js       # Centralized navigation
│   ├── add-car.js         # Add car form logic
│   ├── car-success.js     # Success page logic
│   └── car-detail.js      # Car details logic
├── css/
│   └── style.css          # All styling
├── server.js              # Express server
├── package.json           # Dependencies
└── .env                   # Environment configuration
```

## Usage

### Adding a New Car
1. Click "Add Car" in the navigation
2. Fill out the comprehensive form with:
   - Basic information (Make, Model, Year)
   - Engine specifications
   - Performance details
   - Fuel efficiency
   - Condition and appearance
   - Description and key features
   - Upload multiple images
   - Set pricing
3. Submit the form
4. View the success page with car preview
5. Car is now available in the inventory

### Viewing Cars
- All cars appear on the homepage (`buy.html`)
- Click "View Details" to see full specifications
- Cars are displayed with main image, key specs, and pricing

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the connection string in `.env`
- Verify port 27017 is available

### File Upload Issues
- Check that `uploads/` directory exists
- Verify file permissions
- Ensure image files are under 5MB

### Server Won't Start
- Check if port 3000 is available
- Verify all dependencies are installed
- Check for syntax errors in configuration

## Development
- Use `npm run dev` for development with auto-restart
- MongoDB data persists between server restarts
- Images are stored locally in `uploads/` directory

Enjoy your new car dealership management system! 🚗✨
