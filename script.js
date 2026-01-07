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

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add click handler to clock for refreshing quote
    const clockElement = document.getElementById('clock');
    clockElement.addEventListener('click', function(e) {
        e.preventDefault();
        fetchQuote();
    });

    // Update clock every second
    updateClock();
    setInterval(updateClock, 1000);

    // Fetch initial quote on page load
    fetchQuote();
});
