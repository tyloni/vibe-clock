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

// Update clock every second
updateClock();
setInterval(updateClock, 1000);
