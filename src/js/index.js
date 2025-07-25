// Main JavaScript entry point for Vite
import '../css/styles.css';

// Import all JavaScript modules in the correct order
import sampleData from './data.js';
import './components.js';
import './utils.js';
import LinkedInNetwork from './main.js';

// Make data available globally for backward compatibility
window.sampleData = sampleData;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global app instance
    window.app = new LinkedInNetwork();
});
