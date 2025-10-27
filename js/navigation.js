// Navigation Boilerplate - Centralized Menu System
class NavigationManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.menuItems = [
            { name: 'Tests', href: '/buy', id: 'home' },
            { name: 'About', href: '/about', id: 'about' },
            { name: 'Projects', href: '/projects', id: 'projects' },
            { name: 'Contact', href: '/contact', id: 'contact' },
        ];
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || '/';
        return page;
    }

    getActivePageId() {
        const pageMap = {
            '/buy': 'home',
            'buy': 'Tests',
            '/about': 'about',
            'about': 'about',
            '/projects': 'projects',
            'projects': 'projects',
            '/contact': 'contact',
            'contact': 'contact',
            '/car-detail': 'home',
            'car-detail': 'Tests',
            '/add-car': 'add-car',
            'add-car': 'add-car',
            '/car-success': 'add-car',
            'car-success': 'add-car'
        };
        return pageMap[this.currentPage] || 'home';
    }

    generateNavigation() {
        const activePageId = this.getActivePageId();

        const navHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-black">
            <div class="container-fluid">
                <a class="navbar-brand d-flex align-items-center" href="/" style="margin-bottom: 0; padding-top: 20px; padding-bottom: 0;">
                    <img src="/pictres/yarologo.svg" alt="YARO Logo" style="height: 40px; display: block; vertical-align: middle;">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        ${this.menuItems.map(item => {
            const isActive = item.id === activePageId;
            const activeClass = isActive ? 'active' : '';
            const ariaCurrent = isActive ? 'aria-current="page"' : '';
            const buttonClass = item.class || '';

            if (buttonClass) {
                // Special handling for button-style menu items
                return `
                            <li class="nav-item">
                                <a class="${buttonClass} ${activeClass}" ${ariaCurrent} href="${item.href}">${item.name}</a>
                            </li>`;
            } else {
                return `
                            <li class="nav-item">
                                <a class="nav-link ${activeClass}" ${ariaCurrent} href="${item.href}">${item.name}</a>
                            </li>`;
            }
        }).join('')}
                    </ul>
                </div>
            </div>
        </nav>`;

        return navHTML;
    }

    generateFooter() {
        const footerHTML = `
        <footer class="footer-custom">
            <div class="container py-4">
                <div class="row align-items-center">
                    <div class="col-12 text-center">
                        <span class="fw-bold">&copy; 2025 YARO</span> &mdash; All rights reserved.
                    </div>
                </div>
            </div>
        </footer>`;

        return footerHTML;
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.injectNavigation());
        } else {
            this.injectNavigation();
        }
    }

    injectNavigation() {
        // Find and replace navigation
        const navContainer = document.querySelector('nav.navbar');
        if (navContainer) {
            navContainer.outerHTML = this.generateNavigation();

            // Add event listener to hamburger menu to restart logo glow animation
            this.setupHamburgerAnimation();
        }

        // Find and replace footer
        const footerContainer = document.querySelector('footer.footer-custom');
        if (footerContainer) {
            footerContainer.outerHTML = this.generateFooter();
        }
    }

    setupHamburgerAnimation() {
        // Wait a tick for the new DOM to be ready
        setTimeout(() => {
            const hamburger = document.querySelector('.navbar-toggler');
            const navbar = document.querySelector('nav.navbar');
            const logo = document.querySelector('.navbar-brand img');

            if (logo) {
                // Restart animation on hamburger click
                if (hamburger) {
                    hamburger.addEventListener('click', () => {
                        const newLogo = logo.cloneNode(true);
                        logo.parentNode.replaceChild(newLogo, logo);
                    });
                }

                // Restart animation on navbar hover
                if (navbar) {
                    navbar.addEventListener('mouseenter', () => {
                        const currentLogo = document.querySelector('.navbar-brand img');
                        if (currentLogo) {
                            const newLogo = currentLogo.cloneNode(true);
                            currentLogo.parentNode.replaceChild(newLogo, currentLogo);
                        }
                    });
                }
            }
        }, 0);
    }

    // Method to add new menu items programmatically
    addMenuItem(name, href, id, position = -1) {
        const newItem = { name, href, id };
        if (position === -1) {
            this.menuItems.push(newItem);
        } else {
            this.menuItems.splice(position, 0, newItem);
        }
    }

    // Method to remove menu items
    removeMenuItem(id) {
        this.menuItems = this.menuItems.filter(item => item.id !== id);
    }

    // Method to update menu item
    updateMenuItem(id, updates) {
        const itemIndex = this.menuItems.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            this.menuItems[itemIndex] = { ...this.menuItems[itemIndex], ...updates };
        }
    }
}

// Initialize navigation when script loads
const navigation = new NavigationManager();
navigation.init();

// Make navigation available globally for customization
window.MaxCarNavigation = navigation;
