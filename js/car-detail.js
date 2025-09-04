// Car data
const cars = {
    1: {
        title: "BMW M3 2023",
        price: "$65,000",
        image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80",
        features: [
            "473 HP Twin-Turbo Engine",
            "Manual Transmission",
            "15,000 miles",
            "Premium Sound System",
            "Heated Seats",
            "Navigation System"
        ],
        specs: {
            "Make": "BMW",
            "Model": "M3",
            "Year": "2023",
            "Engine": "3.0L Twin-Turbo I6",
            "Horsepower": "473 HP",
            "Transmission": "6-Speed Manual",
            "Drivetrain": "RWD",
            "Fuel Type": "Gasoline",
            "MPG": "16 City / 23 Highway",
            "Mileage": "15,000 miles",
            "Exterior Color": "Alpine White",
            "Interior Color": "Black Leather"
        },
        description: "This pristine BMW M3 represents the pinnacle of performance luxury sedans. With its twin-turbocharged inline-6 engine producing 473 horsepower, this vehicle delivers exhilarating acceleration while maintaining the comfort and refinement BMW is known for. The manual transmission provides an engaging driving experience for enthusiasts. Recently serviced with all maintenance up to date."
    },
    2: {
        title: "Tesla Model S 2023",
        price: "$89,000",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80",
        features: [
            "Electric Powertrain",
            "Autopilot Included",
            "8,000 miles",
            "Supercharger Access",
            "Premium Interior",
            "Over-the-Air Updates"
        ],
        specs: {
            "Make": "Tesla",
            "Model": "Model S",
            "Year": "2023",
            "Engine": "Electric Motor",
            "Horsepower": "670 HP",
            "Transmission": "Single-Speed",
            "Drivetrain": "AWD",
            "Fuel Type": "Electric",
            "Range": "405 miles",
            "Mileage": "8,000 miles",
            "Exterior Color": "Pearl White",
            "Interior Color": "Black Premium"
        },
        description: "Experience the future of driving with this Tesla Model S. Featuring cutting-edge electric technology, autopilot capabilities, and over-the-air software updates. This vehicle offers incredible performance with instant torque delivery and a range of over 400 miles. The minimalist interior with a large touchscreen provides a unique and modern driving experience."
    },
    3: {
        title: "Porsche 911 Turbo 2022",
        price: "$175,000",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
        features: [
            "572 HP Turbocharged Engine",
            "All-Wheel Drive",
            "12,000 miles",
            "Sport Chrono Package",
            "Premium Audio",
            "Adaptive Suspension"
        ],
        specs: {
            "Make": "Porsche",
            "Model": "911 Turbo",
            "Year": "2022",
            "Engine": "3.8L Twin-Turbo Flat-6",
            "Horsepower": "572 HP",
            "Transmission": "8-Speed PDK",
            "Drivetrain": "AWD",
            "Fuel Type": "Gasoline",
            "MPG": "18 City / 24 Highway",
            "Mileage": "12,000 miles",
            "Exterior Color": "Guards Red",
            "Interior Color": "Black Leather"
        },
        description: "This iconic Porsche 911 Turbo represents automotive excellence in its purest form. The twin-turbocharged flat-6 engine delivers breathtaking performance, while the advanced all-wheel-drive system ensures optimal traction in all conditions. Every detail has been crafted to provide the ultimate sports car experience, from the precision steering to the adaptive suspension system."
    },
    4: {
        title: "Ford Mustang GT 2023",
        price: "$42,000",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
        features: [
            "450 HP V8 Engine",
            "Manual Transmission",
            "5,000 miles",
            "Performance Package",
            "Recaro Seats",
            "Track-Tuned Suspension"
        ],
        specs: {
            "Make": "Ford",
            "Model": "Mustang GT",
            "Year": "2023",
            "Engine": "5.0L V8",
            "Horsepower": "450 HP",
            "Transmission": "6-Speed Manual",
            "Drivetrain": "RWD",
            "Fuel Type": "Gasoline",
            "MPG": "15 City / 24 Highway",
            "Mileage": "5,000 miles",
            "Exterior Color": "Race Red",
            "Interior Color": "Black Recaro"
        },
        description: "American muscle car heritage meets modern performance in this Ford Mustang GT. The naturally aspirated 5.0L V8 engine produces a thrilling exhaust note and impressive power delivery. With the Performance Package, this Mustang is track-ready while remaining comfortable for daily driving. The manual transmission connects you directly to the driving experience."
    },
    5: {
        title: "Audi A4 2023",
        price: "$38,000",
        image: "https://images.unsplash.com/photo-1555652736-e92021d28a10?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        features: [
            "248 HP Turbocharged Engine",
            "Quattro All-Wheel Drive",
            "18,000 miles",
            "Virtual Cockpit",
            "Premium Plus Package",
            "Advanced Safety Features"
        ],
        specs: {
            "Make": "Audi",
            "Model": "A4",
            "Year": "2023",
            "Engine": "2.0L Turbo I4",
            "Horsepower": "248 HP",
            "Transmission": "7-Speed S Tronic",
            "Drivetrain": "AWD (Quattro)",
            "Fuel Type": "Gasoline",
            "MPG": "24 City / 31 Highway",
            "Mileage": "18,000 miles",
            "Exterior Color": "Glacier White",
            "Interior Color": "Black Leather"
        },
        description: "This Audi A4 combines luxury, technology, and performance in a refined package. The turbocharged engine provides smooth power delivery, while the legendary Quattro all-wheel-drive system ensures confident handling in all weather conditions. The interior features premium materials and cutting-edge technology, including the Virtual Cockpit display."
    },
    6: {
        title: "Mercedes C-Class 2022",
        price: "$45,000",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80",
        features: [
            "255 HP Turbocharged Engine",
            "Automatic Transmission",
            "22,000 miles",
            "MBUX Infotainment",
            "Premium Package",
            "Advanced Driver Assistance"
        ],
        specs: {
            "Make": "Mercedes-Benz",
            "Model": "C-Class",
            "Year": "2022",
            "Engine": "2.0L Turbo I4",
            "Horsepower": "255 HP",
            "Transmission": "9-Speed Automatic",
            "Drivetrain": "RWD",
            "Fuel Type": "Gasoline",
            "MPG": "23 City / 32 Highway",
            "Mileage": "22,000 miles",
            "Exterior Color": "Obsidian Black",
            "Interior Color": "Beige Leather"
        },
        description: "Experience luxury and sophistication with this Mercedes-Benz C-Class. The refined turbocharged engine delivers smooth performance, while the advanced MBUX infotainment system keeps you connected. Every aspect of this vehicle has been designed to provide comfort and elegance, from the premium leather interior to the advanced safety features."
    }
};

// Get car ID from URL parameters
function getCarId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || '1';
}

// Load car details
function loadCarDetails() {
    const carId = getCarId();
    const car = cars[carId];

    if (!car) {
        document.body.innerHTML = '<div class="container mt-5"><h1>Car not found</h1><a href="/buy" class="btn btn-primary">Back to Cars</a></div>';
        return;
    }

    // Update page title
    document.title = `${car.title} - MaxCar`;

    // Update car details
    document.getElementById('carTitle').textContent = car.title;
    document.getElementById('carPrice').textContent = car.price;
    document.getElementById('carMainImage').src = car.image;
    document.getElementById('carMainImage').alt = car.title;
    document.getElementById('carDescription').textContent = car.description;

    // Update features
    const featuresContainer = document.getElementById('carFeatures');
    featuresContainer.innerHTML = '';
    car.features.forEach(feature => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="text-success">✓</i> ${feature}`;
        li.className = 'mb-2';
        featuresContainer.appendChild(li);
    });

    // Update specifications (split into two columns)
    const specsArray = Object.entries(car.specs);
    const midpoint = Math.ceil(specsArray.length / 2);

    const specs1Container = document.getElementById('carSpecs1');
    const specs2Container = document.getElementById('carSpecs2');

    specs1Container.innerHTML = '';
    specs2Container.innerHTML = '';

    specsArray.slice(0, midpoint).forEach(([key, value]) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="text-info">${key}</td><td>${value}</td>`;
        specs1Container.appendChild(tr);
    });

    specsArray.slice(midpoint).forEach(([key, value]) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="text-info">${key}</td><td>${value}</td>`;
        specs2Container.appendChild(tr);
    });
}

// Load car details when page loads
document.addEventListener('DOMContentLoaded', loadCarDetails);
