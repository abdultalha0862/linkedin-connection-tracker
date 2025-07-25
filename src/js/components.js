// Component creation functions
const components = {
    // Create sidebar navigation
    createSidebarNav(navItems) {
        return navItems.map(item => `
            <a href="${item.href}" class="sidebar-nav-item">
                <div class="sidebar-nav-link">
                    <svg class="sidebar-nav-icon" viewBox="0 0 24 24">
                        ${item.icon}
                    </svg>
                    <span class="sidebar-nav-text">${item.text}</span>
                </div>
                ${item.count ? `<span class="sidebar-nav-count">${item.count}</span>` : ''}
            </a>
        `).join('');
    },

    // Create connection tracker widget
    createConnectionTracker(trackerData) {
        return `
            <div class="connection-tracker-widget">
                <h3 class="tracker-title">Connection Tracker</h3>
                
                <!-- Weekly Limit -->
                <div class="tracker-section limit-section">
                    <div class="section-header-tracker">
                        <span class="section-text">Weekly connection limit</span>
                        <span class="section-value blue">${trackerData.weeklyLimit.percentage}%</span>
                    </div>
                    <div class="section-subtext">${trackerData.weeklyLimit.used} of ${trackerData.weeklyLimit.total} used</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${trackerData.weeklyLimit.percentage}%"></div>
                    </div>
                </div>

                <!-- Pending Requests -->
                <div class="tracker-section pending-section">
                    <div class="section-header-tracker">
                        <span class="section-text">Pending Requests</span>
                        <span class="section-value orange">${trackerData.pendingRequests.count}</span>
                    </div>
                    <div class="section-subtext">${trackerData.pendingRequests.description}</div>
                    <div class="section-actions">
                        <button class="section-btn warning" onclick="handleViewPending()">View Pending</button>
                    </div>
                </div>

                <!-- Recently Accepted -->
                <div class="tracker-section accepted-section">
                    <div class="section-header-tracker">
                        <span class="section-text">Recently Accepted</span>
                        <span class="section-value green">${trackerData.recentlyAccepted.count}</span>
                    </div>
                    <div class="section-subtext">${trackerData.recentlyAccepted.description}</div>
                    <div class="section-actions">
                        <button class="section-btn success" onclick="handleViewAccepted()">View Accepted</button>
                    </div>
                </div>

                <!-- View Detailed Stats -->
                <div class="detailed-stats-toggle" onclick="toggleDetailedStats()">
                    <span>View detailed stats</span>
                    <svg class="expand-icon" viewBox="0 0 16 16" width="16" height="16">
                        <path d="M8 12l-4-4h8l-4 4z" fill="#666"/>
                    </svg>
                </div>

                <!-- Detailed Stats Grid -->
                <div class="stats-grid" id="detailedStats" style="display: none;">
                    <div class="stat-item">
                        <div class="stat-label">Total Connections</div>
                        <div class="stat-value blue">${trackerData.detailedStats.totalConnections}</div>
                    </div>
                    
                    <div class="stat-item">
                        <div class="stat-label">Pending Requ.</div>
                        <div class="stat-value orange">${trackerData.detailedStats.pendingRequests}</div>
                    </div>
                    
                    <div class="stat-item">
                        <div class="stat-label">Accepted Rate</div>
                        <div class="stat-value green">${trackerData.detailedStats.acceptedRate}%</div>
                    </div>
                    
                    <div class="stat-item">
                        <div class="stat-label">Ignored Requests</div>
                        <div class="stat-value red">${trackerData.detailedStats.ignoredRequests}</div>
                    </div>
                </div>
            </div>
        `;
    },

    // Create invitations section
    createInvitationsSection() {
        return `
            <div class="section-header">
                <h2 class="section-title">No pending invitations</h2>
                <a href="#" class="see-all-btn" onclick="handleManageAll()">Manage all</a>
            </div>
            <div class="invitation-card">
                <p class="invitation-message">You have no pending invitations to connect with others.</p>
                <a href="#" class="manage-btn" onclick="handleManageInvitations()">Manage invitations</a>
            </div>
        `;
    },

    // Create person card
    createPersonCard(person) {
        return `
            <div class="person-card" data-person-id="${person.id}">
                <img src="${person.avatar}" alt="${person.name}" class="person-avatar" loading="lazy">
                <h3 class="person-name">${person.name}</h3>
                <p class="person-title">${person.title}</p>
                <p class="mutual-connections">${person.mutualConnections}</p>
                <button class="connect-btn" onclick="handleConnect(${person.id})">Connect</button>
            </div>
        `;
    },

    // Create people grid
    createPeopleGrid(people) {
        return `
            <div class="people-grid">
                ${people.map(person => this.createPersonCard(person)).join('')}
            </div>
        `;
    },

    // Create people section
    createPeopleSection(title, people, sectionId) {
        return `
            <div class="section-header">
                <h2 class="section-title">${title}</h2>
                <a href="#" class="see-all-btn" onclick="handleSeeAll('${sectionId}')">See all</a>
            </div>
            ${this.createPeopleGrid(people)}
        `;
    },

    // Create loading skeleton for person card
    createPersonCardSkeleton() {
        return `
            <div class="person-card skeleton">
                <div class="person-avatar skeleton"></div>
                <div class="person-name skeleton" style="height: 20px; margin-bottom: 8px;"></div>
                <div class="person-title skeleton" style="height: 40px; margin-bottom: 8px;"></div>
                <div class="mutual-connections skeleton" style="height: 15px; margin-bottom: 12px;"></div>
                <div class="connect-btn skeleton" style="height: 32px;"></div>
            </div>
        `;
    },

    // Create loading grid
    createLoadingGrid(count = 8) {
        const skeletons = Array(count).fill(this.createPersonCardSkeleton()).join('');
        return `
            <div class="people-grid">
                ${skeletons}
            </div>
        `;
    },

    // Create error message
    createErrorMessage(message) {
        return `
            <div class="error-message">
                <p>${message}</p>
                <button class="btn btn-primary" onclick="location.reload()">Retry</button>
            </div>
        `;
    },

    // Create success message
    createSuccessMessage(message) {
        return `
            <div class="success-message">
                <p>${message}</p>
            </div>
        `;
    },

    // Create modal
    createModal(id, title, content, actions = '') {
        return `
            <div class="modal-overlay" id="${id}" onclick="closeModal('${id}')">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3 class="modal-title">${title}</h3>
                        <button class="modal-close" onclick="closeModal('${id}')">&times;</button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    ${actions ? `<div class="modal-actions">${actions}</div>` : ''}
                </div>
            </div>
        `;
    },

    // Create confirmation dialog
    createConfirmDialog(message, onConfirm, onCancel) {
        const actions = `
            <button class="btn btn-outline" onclick="${onCancel}">Cancel</button>
            <button class="btn btn-primary" onclick="${onConfirm}">Confirm</button>
        `;
        return this.createModal('confirmDialog', 'Confirm Action', `<p>${message}</p>`, actions);
    }
};

// Animation utilities
const animations = {
    // Animate progress bar
    animateProgressBar(element, targetWidth, duration = 800) {
        const startWidth = 0;
        const startTime = performance.now();

        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentWidth = startWidth + (targetWidth - startWidth) * progress;
            
            element.style.width = `${currentWidth}%`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    },

    // Fade in animation
    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        const startTime = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = progress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    },

    // Slide up animation
    slideUp(element, duration = 300) {
        element.style.transform = 'translateY(20px)';
        element.style.opacity = '0';
        element.style.display = 'block';
        
        const startTime = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const translateY = 20 * (1 - progress);
            element.style.transform = `translateY(${translateY}px)`;
            element.style.opacity = progress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.transform = '';
            }
        }
        
        requestAnimationFrame(animate);
    },

    // Stagger animation for multiple elements
    staggerAnimation(elements, animationType = 'slideUp', delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                this[animationType](element);
            }, index * delay);
        });
    }
};

// Export components and animations
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { components, animations };
} else {
    window.components = components;
    window.animations = animations;
}

// ES Module export for Vite
export default { components, animations };
