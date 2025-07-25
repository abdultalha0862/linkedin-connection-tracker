// Main JavaScript entry point for Vite
import '../css/styles.css';

// Import all JavaScript modules in the correct order
import sampleData from './data.js';
import componentsModule from './components.js';
import utilsModule from './utils.js';
import LinkedInNetwork from './main.js';

// Make data available globally for backward compatibility
window.sampleData = sampleData;

// Make components and utils available globally
window.components = componentsModule.components;
window.animations = componentsModule.animations;
window.utils = utilsModule;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global app instance
    window.app = new LinkedInNetwork();
});
