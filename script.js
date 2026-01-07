function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;

    const clockElement = document.getElementById('clock');
    clockElement.textContent = timeString;
    clockElement.setAttribute('data-time', timeString);
}

// Fetch a random quote from DummyJSON API
async function fetchQuote() {
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');

    try {
        quoteElement.textContent = 'Loading...';
        authorElement.textContent = '';

        const response = await fetch('https://dummyjson.com/quotes/random');
        const data = await response.json();

        quoteElement.textContent = data.quote;
        authorElement.textContent = data.author;
    } catch (error) {
        quoteElement.textContent = 'Failed to load. Click the clock to try again.';
        authorElement.textContent = '';
        console.error('Error fetching quote:', error);
    }
}

// Save custom vibe to localStorage
function saveCustomVibe() {
    const input = document.getElementById('customVibeInput');
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');

    const customMessage = input.value.trim();

    if (customMessage) {
        quoteElement.textContent = customMessage;
        authorElement.textContent = 'You';

        // Save to localStorage
        localStorage.setItem('customVibe', customMessage);

        input.value = '';
    }
}

// Load custom vibe from localStorage
function loadCustomVibe() {
    const customVibe = localStorage.getItem('customVibe');
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');

    if (customVibe) {
        quoteElement.textContent = customVibe;
        authorElement.textContent = 'You';
        return true;
    }
    return false;
}

// Reset to API quotes
function resetVibe() {
    localStorage.removeItem('customVibe');
    fetchQuote();
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add click handler to clock for refreshing quote
    const clockElement = document.getElementById('clock');
    clockElement.addEventListener('click', function(e) {
        e.preventDefault();
        fetchQuote();
    });

    // Add handler for Save Vibe button
    const saveVibeBtn = document.getElementById('saveVibeBtn');
    saveVibeBtn.addEventListener('click', saveCustomVibe);

    // Add handler for Reset button
    const resetVibeBtn = document.getElementById('resetVibeBtn');
    resetVibeBtn.addEventListener('click', resetVibe);

    // Add handler for Enter key in input
    const customVibeInput = document.getElementById('customVibeInput');
    customVibeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveCustomVibe();
        }
    });

    // Update clock every second
    updateClock();
    setInterval(updateClock, 1000);

    // Load custom vibe or fetch quote on page load
    if (!loadCustomVibe()) {
        fetchQuote();
    }
});
