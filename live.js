// DOM elements
const currentTimeDisplay = document.getElementById('current-time');
const bhajanTitle = document.getElementById('bhajan-title');
const bhajanText = document.getElementById('bhajan-text');
const englishButton = document.getElementById('english-button');
const hindiButton = document.getElementById('hindi-button');

// Developer control elements
const devToggle = document.getElementById('dev-toggle');
const devControls = document.getElementById('dev-controls');
const devHoursInput = document.getElementById('dev-hours');
const devMinutesInput = document.getElementById('dev-minutes');
const setTimeButton = document.getElementById('set-time-button');
const resetTimeButton = document.getElementById('reset-time-button');
const presetMorning = document.getElementById('preset-morning');
const presetMidMorning = document.getElementById('preset-midmorning');
const presetEvening = document.getElementById('preset-evening');
const presetDefault = document.getElementById('preset-default');

// Current bhajan and time override
let bhajans = {};
let currentBhajan = null;
let useCustomTime = false;
let customHours = 12;
let customMinutes = 0;

// Fetch bhajans from JSON file
async function loadBhajansFromJSON() {
    try {
        const response = await fetch('aarti.json');
        const data = await response.json();
        bhajans = data.bhajans || {};
        console.log('Bhajans loaded successfully:', bhajans);
        
        // Initialize after loading data
        updateTime();
        updateBhajan();
    } catch (error) {
        console.error('Error loading bhajans:', error);
        bhajanText.textContent = 'Error loading bhajans. Please try again later.';
    }
}

// Get current time (real or custom)
function getCurrentTime() {
    if (useCustomTime) {
        // Return custom time
        const customDate = new Date();
        customDate.setHours(customHours);
        customDate.setMinutes(customMinutes);
        return customDate;
    } else {
        // Return real time
        return new Date();
    }
}

// Update time display
function updateTime() {
    const now = getCurrentTime();
    
    // Format for display
    let timeString = now.toLocaleTimeString();
    if (useCustomTime) {
        timeString += ' (Custom Time)';
    }
    
    currentTimeDisplay.textContent = `Current Time: ${timeString}`;
}

// Convert time string (HH:MM) to minutes since midnight
function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

// Determine which bhajan to display based on time
function selectBhajanByTime() {
    const now = getCurrentTime();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentMinutes = hours * 60 + minutes;
    
    // Default bhajan (fallback)
    let selectedBhajan = null;
    
    // Find matching bhajan based on time ranges in the data
    for (const bhajanId in bhajans) {
        const bhajan = bhajans[bhajanId];
        if (bhajan.startTime && bhajan.endTime) {
            const startMinutes = timeToMinutes(bhajan.startTime);
            const endMinutes = timeToMinutes(bhajan.endTime);
            
            if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
                return bhajan;
            }
        }
    }
    
    // Return default bhajan if no time match
    return bhajans.default || Object.values(bhajans)[9];
}

// Display bhajan
function displayBhajan(bhajan, language = 'english') {
    if (!bhajan) return;
    
    currentBhajan = bhajan;
    bhajanTitle.textContent = bhajan.title;
    
    // Use language keys from JSON
    const textKey = language === 'english' ? 'en' : 'hi';
    bhajanText.textContent = bhajan[textKey] || bhajan.english || 'Text not available';
    
    // Update active button state
    if (language === 'english') {
        englishButton.classList.add('active');
        hindiButton.classList.remove('active');
    } else {
        hindiButton.classList.add('active');
        englishButton.classList.remove('active');
    }
}

// Update bhajan based on current time
function updateBhajan() {
    const bhajan = selectBhajanByTime();
    
    // Only update if the bhajan has changed
    if (!currentBhajan || bhajan.title !== currentBhajan.title) {
        // Get the current language preference
        const currentLanguage = hindiButton.classList.contains('active') ? 'hindi' : 'english';
        displayBhajan(bhajan, currentLanguage);
    }
}

// Set custom time
function setCustomTime(hours, minutes) {
    customHours = hours;
    customMinutes = minutes;
    useCustomTime = true;
    
    // Update display
    updateTime();
    updateBhajan();
}

// Reset to real time
function resetToRealTime() {
    useCustomTime = false;
    
    // Update inputs to match current time
    const now = new Date();
    devHoursInput.value = now.getHours();
    devMinutesInput.value = now.getMinutes();
    
    // Update display
    updateTime();
    updateBhajan();
}

// Initialize app
function initApp() {
    // Load bhajans data first
    loadBhajansFromJSON();
    
    // Update time every second
    setInterval(updateTime, 1000);
    
    // Check if bhajan should change every minute (only for real time)
    setInterval(() => {
        if (!useCustomTime) {
            updateBhajan();
        }
    }, 60000);
    
    // Initialize developer controls
    initDevControls();
}

// Initialize developer controls
function initDevControls() {
    // Set initial values
    const now = new Date();
    devHoursInput.value = now.getHours();
    devMinutesInput.value = now.getMinutes();
    
    // Toggle developer panel visibility
    devToggle.addEventListener('click', () => {
        devControls.classList.toggle('visible');
    });
    
    // Set custom time button
    setTimeButton.addEventListener('click', () => {
        const hours = parseInt(devHoursInput.value, 10) || 0;
        const minutes = parseInt(devMinutesInput.value, 10) || 0;
        setCustomTime(hours, minutes);
    });
    
    // Reset to real time button
    resetTimeButton.addEventListener('click', resetToRealTime);
    
    // Preset buttons
    presetMorning.addEventListener('click', () => {
        devHoursInput.value = 5;
        devMinutesInput.value = 0;
        setCustomTime(5, 0);
    });
    
    presetMidMorning.addEventListener('click', () => {
        devHoursInput.value = 8;
        devMinutesInput.value = 0;
        setCustomTime(8, 0);
    });
    
    presetEvening.addEventListener('click', () => {
        devHoursInput.value = 19;
        devMinutesInput.value = 30;
        setCustomTime(19, 30);
    });
    
    presetDefault.addEventListener('click', () => {
        devHoursInput.value = 12;
        devMinutesInput.value = 0;
        setCustomTime(12, 0);
    });
    
    // Also add keyboard shortcut for dev panel (Ctrl+Shift+D)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            devControls.classList.toggle('visible');
            e.preventDefault();
        }
    });
}

// Language button event listeners
englishButton.addEventListener('click', () => {
    displayBhajan(currentBhajan, 'english');
});

hindiButton.addEventListener('click', () => {
    displayBhajan(currentBhajan, 'hindi');
});


// Initialize the app when page loads
window.addEventListener('load', initApp);