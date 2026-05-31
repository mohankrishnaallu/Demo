// Demo JavaScript File

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Demo project loaded successfully!');
    initializeApp();
});

// Main initialization function
function initializeApp() {
    console.log('Initializing application...');
    
    // Add click event listener example
    const contentSection = document.getElementById('content');
    if (contentSection) {
        contentSection.addEventListener('click', function() {
            console.log('Content section clicked');
        });
    }
}

// Example utility function
function displayMessage(message) {
    console.log('Message:', message);
}

// Example function to update content
function updateContent(elementId, newContent) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = newContent;
    }
}

// Console log for verification
console.log('Script loaded successfully!');