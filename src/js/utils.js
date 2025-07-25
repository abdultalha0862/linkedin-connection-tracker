// Utility functions
const utils = {
    // DOM manipulation utilities
    dom: {
        // Get element by ID
        getId(id) {
            return document.getElementById(id);
        },

        // Get elements by class name
        getClass(className) {
            return document.getElementsByClassName(className);
        },

        // Query selector
        query(selector) {
            return document.querySelector(selector);
        },

        // Query selector all
        queryAll(selector) {
            return document.querySelectorAll(selector);
        },

        // Create element
        create(tag, className = '', innerHTML = '') {
            const element = document.createElement(tag);
            if (className) element.className = className;
            if (innerHTML) element.innerHTML = innerHTML;
            return element;
        },

        // Add event listener with error handling
        on(element, event, callback) {
            if (element && typeof callback === 'function') {
                element.addEventListener(event, callback);
            }
        },

        // Remove event listener
        off(element, event, callback) {
            if (element && typeof callback === 'function') {
                element.removeEventListener(event, callback);
            }
        },

        // Show element
        show(element) {
            if (element) {
                element.style.display = 'block';
                element.classList.remove('hidden');
            }
        },

        // Hide element
        hide(element) {
            if (element) {
                element.style.display = 'none';
                element.classList.add('hidden');
            }
        },

        // Toggle element visibility
        toggle(element) {
            if (element) {
                if (element.style.display === 'none' || element.classList.contains('hidden')) {
                    this.show(element);
                } else {
                    this.hide(element);
                }
            }
        }
    },

    // Local storage utilities
    storage: {
        // Set item
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.error('Error saving to localStorage:', error);
                return false;
            }
        },

        // Get item
        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (error) {
                console.error('Error reading from localStorage:', error);
                return defaultValue;
            }
        },

        // Remove item
        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                console.error('Error removing from localStorage:', error);
                return false;
            }
        },

        // Clear all
        clear() {
            try {
                localStorage.clear();
                return true;
            } catch (error) {
                console.error('Error clearing localStorage:', error);
                return false;
            }
        }
    },

    // API simulation utilities
    api: {
        // Simulate API delay
        delay(ms = 1000) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        // Simulate network request
        async request(endpoint, options = {}) {
            await this.delay(options.delay || 1000);
            
            // Simulate random failures
            if (options.failureRate && Math.random() < options.failureRate) {
                throw new Error('Network request failed');
            }

            // Return mock data based on endpoint
            switch (endpoint) {
                case '/api/connections':
                    return { success: true, data: window.sampleData?.suggestions || [] };
                case '/api/college-connections':
                    return { success: true, data: window.sampleData?.collegeConnections || [] };
                case '/api/tracker':
                    return { success: true, data: window.sampleData?.connectionTracker || {} };
                default:
                    return { success: true, data: {} };
            }
        },

        // Connect to person
        async connect(personId) {
            await this.delay(500);
            
            // Simulate 90% success rate
            if (Math.random() < 0.9) {
                return { success: true, message: 'Connection request sent successfully!' };
            } else {
                throw new Error('Failed to send connection request. Please try again.');
            }
        }
    },

    // Format utilities
    format: {
        // Format number with commas
        number(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },

        // Truncate text
        truncate(text, maxLength = 100) {
            if (text.length <= maxLength) return text;
            return text.substring(0, maxLength).trim() + '...';
        },

        // Format date
        date(date, options = {}) {
            const defaultOptions = {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            };
            return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
        },

        // Format relative time
        timeAgo(date) {
            const now = new Date();
            const past = new Date(date);
            const diffInSeconds = Math.floor((now - past) / 1000);

            const intervals = {
                year: 31536000,
                month: 2592000,
                week: 604800,
                day: 86400,
                hour: 3600,
                minute: 60
            };

            for (const [unit, seconds] of Object.entries(intervals)) {
                const interval = Math.floor(diffInSeconds / seconds);
                if (interval >= 1) {
                    return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
                }
            }

            return 'just now';
        }
    },

    // Validation utilities
    validate: {
        // Check if email is valid
        email(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        // Check if string is not empty
        notEmpty(str) {
            return str && str.trim().length > 0;
        },

        // Check if number is in range
        inRange(num, min, max) {
            return num >= min && num <= max;
        }
    },

    // Debounce function
    debounce(func, wait, immediate = false) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Deep clone object
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => this.deepClone(item));
        if (typeof obj === 'object') {
            const clonedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = this.deepClone(obj[key]);
                }
            }
            return clonedObj;
        }
    },

    // Check if device is mobile
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    // Check if user prefers reduced motion
    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    // Smooth scroll to element
    scrollTo(element, offset = 0) {
        if (element) {
            const top = element.offsetTop - offset;
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }
    },

    // Copy text to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            return false;
        }
    },

    // Show notification
    showNotification(message, type = 'info', duration = 3000) {
        const notification = utils.dom.create('div', `notification notification-${type}`, message);
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    },

    // Error handler
    handleError(error, context = 'Application') {
        console.error(`${context} Error:`, error);
        
        const userMessage = error.message || 'An unexpected error occurred. Please try again.';
        this.showNotification(userMessage, 'error');
        
        // You could also send error to logging service here
        // analytics.trackError(error, context);
    },

    // Performance monitoring
    performance: {
        marks: {},

        start(name) {
            this.marks[name] = performance.now();
        },

        end(name) {
            if (this.marks[name]) {
                const duration = performance.now() - this.marks[name];
                console.log(`${name}: ${duration.toFixed(2)}ms`);
                delete this.marks[name];
                return duration;
            }
        }
    }
};

// Export utils
if (typeof module !== 'undefined' && module.exports) {
    module.exports = utils;
} else {
    window.utils = utils;
}
