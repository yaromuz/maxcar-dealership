// Car Success Page Handler
document.addEventListener('DOMContentLoaded', function () {
    const carId = localStorage.getItem('newCarId');

    if (carId) {
        loadCarDetails(carId);
        // Clear the stored ID
        localStorage.removeItem('newCarId');
    } else {
        // No car ID found, show error or redirect
        showError('No car information found.');
    }
});

async function loadCarDetails(carId) {
    try {
        const response = await fetch(`/api/cars/${carId}`);
        const car = await response.json();

        if (response.ok) {
            displayCarPreview(car);
            setupViewButton(carId);
        } else {
            throw new Error(car.message || 'Failed to load car details');
        }
    } catch (error) {
        console.error('Error loading car details:', error);
        showError('Failed to load car details.');
    }
}

function displayCarPreview(car) {
    const previewContainer = document.getElementById('carPreview');

    const carHTML = `
        <div class="row align-items-center">
            <div class="col-md-4">
                <img src="${car.mainImage || car.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'}" 
                     class="img-fluid rounded" alt="${car.fullName}">
            </div>
            <div class="col-md-8 text-start">
                <h3 class="text-primary mb-3">${car.fullName}</h3>
                <div class="row g-2 mb-3">
                    <div class="col-sm-6">
                        <small>Engine:</small><br>
                        <strong>${car.engine}</strong>
                    </div>
                    <div class="col-sm-6">
                        <small>Horsepower:</small><br>
                        <strong>${car.horsepower}</strong>
                    </div>
                    <div class="col-sm-6">
                        <small>Transmission:</small><br>
                        <strong>${car.transmission}</strong>
                    </div>
                    <div class="col-sm-6">
                        <small>Mileage:</small><br>
                        <strong>${car.mileage}</strong>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <small>Price:</small><br>
                        <span class="h4 text-success fw-bold">$${car.price.toLocaleString()}</span>
                    </div>
                    <div class="text-end">
                        <span class="badge bg-success fs-6">Available</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    previewContainer.innerHTML = carHTML;
}

function setupViewButton(carId) {
    const viewBtn = document.getElementById('viewCarBtn');
    if (viewBtn) {
        viewBtn.href = `/car-detail?id=${carId}`;
    }
}

function showError(message) {
    const previewContainer = document.getElementById('carPreview');
    previewContainer.innerHTML = `
        <div class="alert alert-warning" role="alert">
            <svg width="20" height="20" fill="currentColor" class="me-2" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            ${message}
        </div>
    `;

    // Hide the view button if there's an error
    const viewBtn = document.getElementById('viewCarBtn');
    if (viewBtn) {
        viewBtn.style.display = 'none';
    }
}
