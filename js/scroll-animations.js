// Scroll Animation - Trigger animations when elements come into view
class ScrollAnimations {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Select all elements to animate
        this.elements = [
            ...document.querySelectorAll('.features-section'),
            ...document.querySelectorAll('.featured-cars'),
            ...document.querySelectorAll('.cta-section'),
            ...document.querySelectorAll('.feature-card'),
            ...document.querySelectorAll('.car-card'),
            ...document.querySelectorAll('.project-card')
        ];

        // Create Intersection Observer
        const options = {
            threshold: 0.15, // Trigger when 15% of element is visible
            rootMargin: '0px 0px -50px 0px' // Start animation slightly before element is fully visible
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: stop observing after animation triggers once
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe all elements
        this.elements.forEach(element => {
            this.observer.observe(element);
        });
    }
}

// Initialize scroll animations
const scrollAnimations = new ScrollAnimations();
