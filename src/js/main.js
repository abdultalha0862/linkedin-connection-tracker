// Main application JavaScript
class LinkedInNetwork {
    constructor() {
        this.isLoaded = false;
        this.connectedPeople = new Set();
        this.currentTab = 'grow';
        this.detailedStatsVisible = false;
        
        this.init();
    }

    // Initialize the application
    async init() {
        try {
            utils.performance.start('appInit');
            
            // Show loading spinner
            this.showLoading(true);
            
            // Initialize components
            await this.initComponents();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Load data
            await this.loadData();
            
            // Hide loading spinner
            this.showLoading(false);
            
            // Show the page content (prevent flash of unstyled content)
            document.body.classList.add('loaded');
            
            this.isLoaded = true;
            utils.performance.end('appInit');
            
            console.log('LinkedIn Network app initialized successfully');
        } catch (error) {
            utils.handleError(error, 'App Initialization');
            this.showLoading(false);
            // Show the page even if there's an error
            document.body.classList.add('loaded');
        }
    }

    // Initialize components
    async initComponents() {
        // Load sidebar navigation
        this.loadSidebarNavigation();
        
        // Initialize search functionality
        this.initSearch();
        
        // Initialize responsive handlers
        this.initResponsive();
    }

    // Load sidebar navigation
    loadSidebarNavigation() {
        const sidebarNav = utils.dom.getId('sidebarNav');
        if (sidebarNav && window.sampleData) {
            sidebarNav.innerHTML = components.createSidebarNav(window.sampleData.sidebarNavigation);
        }
    }

    // Initialize search functionality
    initSearch() {
        const searchInput = utils.dom.getId('searchInput');
        if (searchInput) {
            const debouncedSearch = utils.debounce(this.handleSearch.bind(this), 300);
            utils.dom.on(searchInput, 'input', debouncedSearch);
        }
    }

    // Handle search
    handleSearch(event) {
        const query = event.target.value.trim();
        if (query.length > 2) {
            console.log('Searching for:', query);
            // Implement search functionality here
            // You could filter the people suggestions based on the query
        }
    }

    // Initialize responsive handlers
    initResponsive() {
        window.addEventListener('resize', utils.throttle(() => {
            this.handleResize();
        }, 250));
    }

    // Handle window resize
    handleResize() {
        // Add responsive behavior here
        const isMobile = window.innerWidth <= 768;
        document.body.classList.toggle('mobile-view', isMobile);
    }

    // Set up event listeners
    setupEventListeners() {
        // Tab switching
        const navTabs = utils.dom.queryAll('.nav-tab');
        navTabs.forEach(tab => {
            utils.dom.on(tab, 'click', (e) => {
                e.preventDefault();
                this.switchTab(tab.dataset.tab);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeydown.bind(this));
        
        // Handle network status
        window.addEventListener('online', () => {
            utils.showNotification('Connection restored', 'success');
        });
        
        window.addEventListener('offline', () => {
            utils.showNotification('Connection lost. Some features may not work.', 'warning');
        });
    }

    // Handle keyboard navigation
    handleKeydown(event) {
        // Add keyboard shortcuts here
        if (event.ctrlKey || event.metaKey) {
            switch (event.key) {
                case 'k':
                    event.preventDefault();
                    const searchInput = utils.dom.getId('searchInput');
                    if (searchInput) searchInput.focus();
                    break;
            }
        }
    }

    // Switch tabs
    switchTab(tabName) {
        if (this.currentTab === tabName) return;
        
        this.currentTab = tabName;
        
        // Update tab appearance
        const navTabs = utils.dom.queryAll('.nav-tab');
        navTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        
        // Load tab content
        this.loadTabContent(tabName);
    }

    // Load tab content
    async loadTabContent(tabName) {
        try {
            this.showLoading(true, 'content');
            
            switch (tabName) {
                case 'grow':
                    await this.loadGrowContent();
                    break;
                case 'catch-up':
                    await this.loadCatchUpContent();
                    break;
            }
            
            this.showLoading(false, 'content');
        } catch (error) {
            utils.handleError(error, 'Tab Loading');
            this.showLoading(false, 'content');
        }
    }

    // Load grow tab content
    async loadGrowContent() {
        // This content is already loaded, just ensure it's visible
        const sections = ['connectionTracker', 'invitationsSection', 'peopleSection', 'collegeSection'];
        sections.forEach(sectionId => {
            const section = utils.dom.getId(sectionId);
            if (section) {
                utils.dom.show(section);
            }
        });
    }

    // Load catch-up tab content
    async loadCatchUpContent() {
        // Hide grow content and show catch-up content
        const growSections = ['connectionTracker', 'invitationsSection', 'peopleSection', 'collegeSection'];
        growSections.forEach(sectionId => {
            const section = utils.dom.getId(sectionId);
            if (section) {
                utils.dom.hide(section);
            }
        });
        
        // You could load different content for catch-up tab here
        utils.showNotification('Catch-up content would be loaded here', 'info');
    }

    // Load all data
    async loadData() {
        if (!window.sampleData) {
            throw new Error('Sample data not available');
        }

        // Load connection tracker
        await this.loadConnectionTracker();
        
        // Load invitations
        await this.loadInvitations();
        
        // Load people suggestions
        await this.loadPeopleSuggestions();
        
        // Load college connections
        await this.loadCollegeConnections();
    }

    // Load connection tracker
    async loadConnectionTracker() {
        const container = utils.dom.getId('connectionTracker');
        if (container && window.sampleData.connectionTracker) {
            container.innerHTML = components.createConnectionTracker(window.sampleData.connectionTracker);
            
            // Animate progress bars
            const progressBars = container.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const width = parseFloat(bar.style.width);
                bar.style.width = '0%';
                setTimeout(() => {
                    animations.animateProgressBar(bar, width);
                }, 100);
            });
        }
    }

    // Load invitations
    async loadInvitations() {
        const container = utils.dom.getId('invitationsSection');
        if (container) {
            container.innerHTML = components.createInvitationsSection();
        }
    }

    // Load people suggestions
    async loadPeopleSuggestions() {
        const container = utils.dom.getId('peopleSection');
        if (container && window.sampleData.suggestions) {
            const title = 'People you may know based on your recent activity';
            container.innerHTML = components.createPeopleSection(title, window.sampleData.suggestions, 'people');
            
            // Animate person cards
            const cards = container.querySelectorAll('.person-card');
            animations.staggerAnimation(Array.from(cards), 'slideUp', 50);
        }
    }

    // Load college connections
    async loadCollegeConnections() {
        const container = utils.dom.getId('collegeSection');
        if (container && window.sampleData.collegeConnections) {
            const title = 'People you may know from BV Raju Institute of Technology (BVRIT)';
            container.innerHTML = components.createPeopleSection(title, window.sampleData.collegeConnections, 'college');
            
            // Animate person cards with delay
            setTimeout(() => {
                const cards = container.querySelectorAll('.person-card');
                animations.staggerAnimation(Array.from(cards), 'slideUp', 50);
            }, 200);
        }
    }

    // Show/hide loading spinner
    showLoading(show, target = 'global') {
        const spinner = utils.dom.getId('loadingSpinner');
        if (spinner) {
            if (show) {
                utils.dom.show(spinner);
            } else {
                utils.dom.hide(spinner);
            }
        }
    }

    // Handle connection request
    async handleConnect(personId) {
        if (this.connectedPeople.has(personId)) {
            utils.showNotification('Already connected to this person', 'info');
            return;
        }

        const personCard = utils.dom.query(`[data-person-id="${personId}"]`);
        const connectBtn = personCard?.querySelector('.connect-btn');
        
        if (connectBtn) {
            const originalText = connectBtn.textContent;
            connectBtn.textContent = 'Sending...';
            connectBtn.disabled = true;
            connectBtn.classList.add('loading');
        }

        try {
            const result = await utils.api.connect(personId);
            
            if (result.success) {
                this.connectedPeople.add(personId);
                
                if (connectBtn) {
                    connectBtn.textContent = 'Pending';
                    connectBtn.classList.remove('connect-btn');
                    connectBtn.classList.add('btn-outline');
                    connectBtn.disabled = true;
                }
                
                utils.showNotification(result.message, 'success');
                
                // Update connection tracker
                this.updateConnectionTracker();
            }
        } catch (error) {
            utils.handleError(error, 'Connection Request');
            
            if (connectBtn) {
                connectBtn.textContent = originalText;
                connectBtn.disabled = false;
                connectBtn.classList.remove('loading');
            }
        }
    }

    // Update connection tracker after successful connection
    updateConnectionTracker() {
        const trackerData = window.sampleData.connectionTracker;
        if (trackerData) {
            trackerData.weeklyLimit.used += 1;
            trackerData.weeklyLimit.percentage = Math.round((trackerData.weeklyLimit.used / trackerData.weeklyLimit.total) * 100);
            trackerData.pendingRequests.count += 1;
            
            // Reload the tracker
            this.loadConnectionTracker();
        }
    }
}

// Global event handlers (called from HTML)
window.toggleDetailedStats = function() {
    const detailedStats = utils.dom.getId('detailedStats');
    const expandIcon = utils.dom.query('.expand-icon');
    
    if (detailedStats) {
        const isVisible = detailedStats.style.display !== 'none';
        
        if (isVisible) {
            utils.dom.hide(detailedStats);
            if (expandIcon) expandIcon.style.transform = '';
        } else {
            utils.dom.show(detailedStats);
            if (expandIcon) expandIcon.style.transform = 'rotate(180deg)';
            animations.fadeIn(detailedStats);
        }
    }
};

window.handleConnect = function(personId) {
    if (window.app) {
        window.app.handleConnect(personId);
    }
};

window.handleViewPending = function() {
    utils.showNotification('View pending requests functionality would be implemented here', 'info');
};

window.handleViewAccepted = function() {
    utils.showNotification('View accepted requests functionality would be implemented here', 'info');
};

window.handleManageAll = function() {
    utils.showNotification('Manage all invitations functionality would be implemented here', 'info');
};

window.handleManageInvitations = function() {
    utils.showNotification('Manage invitations functionality would be implemented here', 'info');
};

window.handleSeeAll = function(sectionId) {
    utils.showNotification(`See all ${sectionId} functionality would be implemented here`, 'info');
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global app instance
    window.app = new LinkedInNetwork();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden - pause any background tasks');
    } else {
        console.log('Page visible - resume background tasks');
    }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LinkedInNetwork;
}
