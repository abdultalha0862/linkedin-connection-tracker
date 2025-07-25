// Sample data for the LinkedIn Network page
const sampleData = {
    sidebarNavigation: [
        {
            icon: `<path d="M12 16v6H3v-6a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3m5.5-3A3.5 3.5 0 1 0 14 9.5a3.5 3.5 0 0 0 3.5 3.5m1 2h-2a2.5 2.5 0 0 0-2.5 2.5V22h7v-4.5a2.5 2.5 0 0 0-2.5-2.5M7.5 2A4.5 4.5 0 1 0 12 6.5 4.49 4.49 0 0 0 7.5 2"/>`,
            text: 'Connections',
            count: '3,495',
            href: '#connections'
        },
        {
            icon: `<path d="M20 6h-2.18a3 3 0 0 0-5.64 0H4a1 1 0 0 0 0 2h8.18a3 3 0 0 0 5.64 0H20a1 1 0 0 0 0-2zM15 7a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm5 5h-8.18a3 3 0 0 0-5.64 0H4a1 1 0 0 0 0 2h2.18a3 3 0 0 0 5.64 0H20a1 1 0 0 0 0-2zM9 13a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm11 5h-2.18a3 3 0 0 0-5.64 0H4a1 1 0 0 0 0 2h8.18a3 3 0 0 0 5.64 0H20a1 1 0 0 0 0-2zm-5 1a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"/>`,
            text: 'Contacts',
            count: '3,495',
            href: '#contacts'
        },
        {
            icon: `<path d="M16 14H8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zM8 12h8a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2zM8 8h4a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2z"/><path d="M19 2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zm1 17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1z"/>`,
            text: 'People I Follow',
            href: '#following'
        },
        {
            icon: `<path d="M9.5 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm1.5 7H8c-3.309 0-6 2.691-6 6v1h2v-1c0-2.206 1.794-4 4-4h3c2.206 0 4 1.794 4 4v1h2v-1c0-3.309-2.691-6-6-6z"/><path d="M16.604 11.048a5.67 5.67 0 0 0 .751-3.44c-.179-1.784-1.175-3.361-2.803-4.44l-1.105 1.666c1.119.742 1.8 1.799 1.918 2.974a3.693 3.693 0 0 1-1.072 2.986l-1.192 1.192 1.618.475C18.951 13.701 19 17.957 19 18h2c0-2.474-.156-4.804-.396-6.952z"/>`,
            text: 'Groups',
            count: '7',
            href: '#groups'
        },
        {
            icon: `<path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85-.85-.37-1.79-.58-2.78-.58-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24v-1.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/>`,
            text: 'Events',
            href: '#events'
        },
        {
            icon: `<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>`,
            text: 'Pages',
            count: '130',
            href: '#pages'
        },
        {
            icon: `<path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>`,
            text: 'Newsletters',
            count: '130',
            href: '#newsletters'
        }
    ],

    connectionTracker: {
        weeklyLimit: {
            used: 2,
            total: 100,
            percentage: 2
        },
        pendingRequests: {
            count: 5,
            description: 'Waiting for response'
        },
        recentlyAccepted: {
            count: 8,
            description: 'Last 30 days'
        },
        detailedStats: {
            totalConnections: 4,
            pendingRequests: 2,
            acceptedRate: 25,
            ignoredRequests: 2
        }
    },

    suggestions: [
        {
            id: 1,
            name: 'Somaye Hashemifar',
            title: 'PhD Student in Computer Engineering at University of Massachusetts Amherst | Data Science, Machine Learning & AI',
            mutualConnections: 'Arash is a mutual connection',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
            category: 'recent-activity'
        },
        {
            id: 2,
            name: 'Mojgan Taheri',
            title: 'Machine Learning Scientist at Tech Solutions Inc.',
            mutualConnections: 'Based on your profile',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
            category: 'recent-activity'
        },
        {
            id: 3,
            name: 'Rahul R',
            title: 'Software Engineer | Full Stack Developer',
            mutualConnections: 'ferzin and 5 other mutual connections',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
            category: 'recent-activity'
        },
        {
            id: 4,
            name: 'Ruchi Bommaraju',
            title: 'Data Scientist | Machine Learning Enthusiast',
            mutualConnections: 'Bartosz and 6 other mutual connections',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
            category: 'recent-activity'
        },
        {
            id: 5,
            name: 'Muhammad Yusuf Hassan',
            title: 'Frontend Developer | React & Vue.js Expert',
            mutualConnections: 'MANIKANTA and 8 other mutual connections',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
            category: 'recent-activity'
        },
        {
            id: 6,
            name: 'Dorna Vineeth',
            title: 'DevOps Engineer | Cloud Infrastructure',
            mutualConnections: 'Sagar Reddy and 15 other mutual connections',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
            category: 'recent-activity'
        },
        {
            id: 7,
            name: 'Alex Chen',
            title: 'Product Manager | Tech Startups',
            mutualConnections: 'Sarah and 12 other mutual connections',
            avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face',
            category: 'recent-activity'
        },
        {
            id: 8,
            name: 'Emma Rodriguez',
            title: 'UX Designer | Digital Solutions',
            mutualConnections: 'Michael and 7 other mutual connections',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face',
            category: 'recent-activity'
        }
    ],

    collegeConnections: [
        {
            id: 9,
            name: 'Dharan Datta Yadlapalli',
            title: 'Software Development Engineer at Amazon',
            mutualConnections: 'Sandeep and 42 other mutual connections',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
            category: 'college'
        },
        {
            id: 10,
            name: 'Sarthak Samantaray',
            title: 'Data Scientist at Microsoft',
            mutualConnections: 'Krishna and 37 other mutual connections',
            avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face',
            category: 'college'
        },
        {
            id: 11,
            name: 'Kaveti Rishipreetham',
            title: 'Full Stack Developer | MERN Stack',
            mutualConnections: 'SATHVIK and 6 other mutual connections',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face',
            category: 'college'
        },
        {
            id: 12,
            name: 'Sanjana Mutyapu',
            title: 'UI/UX Designer | Product Designer',
            mutualConnections: 'Madupu and 19 other mutual connections',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
            category: 'college'
        },
        {
            id: 13,
            name: 'Srihari Panthula',
            title: 'Mobile App Developer | Flutter & React Native',
            mutualConnections: 'Madupu and 68 other mutual connections',
            avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop&crop=face',
            category: 'college'
        },
        {
            id: 14,
            name: 'Navya Nelluri',
            title: 'Data Analyst | Business Intelligence',
            mutualConnections: 'Varun and 9 other mutual connections',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
            category: 'college'
        }
    ]
};

// Export data for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = sampleData;
} else {
    window.sampleData = sampleData;
}
