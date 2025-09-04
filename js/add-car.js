// Add Car Form Handler
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('addCarForm');

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Adding Car...';
            submitBtn.disabled = true;

            try {
                // Collect form data
                const formData = new FormData(form);
                const carData = {};

                // Convert FormData to regular object
                for (let [key, value] of formData.entries()) {
                    carData[key] = value;
                }

                const response = await fetch('/api/cars', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(carData)
                });

                const result = await response.json();

                if (response.ok) {
                    // Success - redirect to success page with car ID
                    localStorage.setItem('newCarId', result.car._id);
                    window.location.href = '/car-success';
                } else {
                    // Error
                    throw new Error(result.message || 'Failed to add car');
                }

            } catch (error) {
                console.error('Error adding car:', error);
                alert('Error adding car: ' + error.message);
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Add validation functionality
    addFormValidation();
});

function addFormValidation() {
    const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');

    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('input', function () {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();

    // Remove existing error styling
    clearFieldError(field);

    if (!value) {
        showFieldError(field, 'This field is required');
        return false;
    }

    // Specific validations
    switch (field.type) {
        case 'number':
            if (field.name === 'year') {
                const year = parseInt(value);
                const currentYear = new Date().getFullYear();
                if (year < 1900 || year > currentYear + 1) {
                    showFieldError(field, `Year must be between 1900 and ${currentYear + 1}`);
                    return false;
                }
            }
            if (field.name === 'price') {
                const price = parseFloat(value);
                if (price < 0) {
                    showFieldError(field, 'Price must be a positive number');
                    return false;
                }
            }
            break;
        case 'url':
            if (field.name === 'imageAddress' && value) {
                const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i;
                if (!urlPattern.test(value)) {
                    showFieldError(field, 'Please enter a valid image URL (jpg, jpeg, png, gif, webp)');
                    return false;
                }
            }
            break;
    }

    return true;
}

function showFieldError(field, message) {
    field.classList.add('is-invalid');

    // Remove existing error message
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }

    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}
