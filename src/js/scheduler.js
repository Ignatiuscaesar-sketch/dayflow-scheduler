document.addEventListener('DOMContentLoaded', function() {
    const activityDisplay = document.getElementById('activity');
    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');

    let activities = [
        {name: "Morning Jog", duration: 1800},  // 30 minutes
        {name: "Email Check", duration: 600},   // 10 minutes
        {name: "Project Meeting", duration: 3600} // 60 minutes
    ];
    let currentActivityIndex = 0;
    let secondsRemaining = 0;
    let isPaused = false;
    let timer = null;

    function displayCurrentActivity() {
        if (currentActivityIndex < activities.length) {
            activityDisplay.innerText = `Current Activity: ${activities[currentActivityIndex].name}`;
            secondsRemaining = activities[currentActivityIndex].duration;
        } else {
            activityDisplay.innerText = "All activities completed!";
            timerDisplay.innerText = "00:00:00";
            clearInterval(timer);
        }
    }

    function formatTime(seconds) {
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let secondsLeft = seconds % 60;
        return [hours, minutes, secondsLeft]
            .map(v => v < 10 ? "0" + v : v)
            .join(":");
    }

    function updateTimer() {
        if (!isPaused && secondsRemaining > 0) {
            secondsRemaining--;
            timerDisplay.innerText = formatTime(secondsRemaining);
        } else if (secondsRemaining === 0) {
            currentActivityIndex++;
            displayCurrentActivity();
        }
    }

    function togglePause() {
        isPaused = !isPaused;
        pauseButton.innerText = isPaused ? 'Resume' : 'Pause';
    }

    startButton.onclick = () => {
        if (!timer) {
            displayCurrentActivity();
            timer = setInterval(updateTimer, 1000);
        }
    };

    pauseButton.onclick = togglePause;
});


document.addEventListener('DOMContentLoaded', function() {
    // Existing setup...

    const journalEntry = document.getElementById('journal-entry');
    const saveJournalButton = document.getElementById('save-journal');

    // Extend activities array to include journal entries
    activities.forEach(activity => activity.journal = "");

    saveJournalButton.onclick = () => {
        if (currentActivityIndex < activities.length) {
            activities[currentActivityIndex].journal = journalEntry.value;
            alert("Journal entry saved!");
            journalEntry.value = ""; // Clear the textarea after saving
        }
    };

    // Function to load journal entry for the selected activity
    function loadJournalEntry() {
        journalEntry.value = activities[currentActivityIndex].journal || "";
    }

    // Extend activity click handler to load journal entry
    activitiesList.onclick = (event) => {
        if (event.target.tagName === 'LI') {
            currentActivityIndex = parseInt(event.target.dataset.index);
            displayCurrentActivity();
            loadJournalEntry();
        }
    };
});


document.addEventListener('DOMContentLoaded', function() {
    const kenyaTime = document.getElementById('kenyaTime');
    const ukTime = document.getElementById('ukTime');
    const usTime = document.getElementById('usTime');

    function updateClocks() {
        const nairobi = new Date().toLocaleTimeString('en-US', { timeZone: 'Africa/Nairobi' });
        const london = new Date().toLocaleTimeString('en-US', { timeZone: 'Europe/London' });
        const newYork = new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York' });

        kenyaTime.textContent = `Nairobi: ${nairobi}`;
        ukTime.textContent = `London: ${london}`;
        usTime.textContent = `New York: ${newYork}`;
    }

    setInterval(updateClocks, 1000);
});


function addClock() {
    const selectedTimezone = document.getElementById('timezone-selector').value;
    const newClock = document.createElement('div');
    newClock.className = 'clock';
    newClock.id = selectedTimezone.split('/').join(''); // Ensure the ID is valid HTML and JS friendly
    document.getElementById('clocks').appendChild(newClock);
    updateClock(); // Make sure it's updated immediately upon being added
}

function updateClocks() {
    document.querySelectorAll('.clock').forEach(clock => {
        // Ensuring timezone is correctly mapped from the ID to a valid IANA timezone
        const timezone = clock.id.replace(/([A-Z][a-z]+|[A-Z]+)/g, '$1 ').trim().replace(/\s/g, '/');
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: timezone });
        clock.textContent = `${timezone.replace(/\//g, ' ')}: ${currentTime}`;
    });
}

setInterval(updateClocks, 1000);

// Ensure the time zone selector is populated after the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const timezoneSelector = document.getElementById('timezone-selector');
    const timeZones = Intl.supportedValuesOf('timeZone');

    timeZones.forEach(zone => {
        const option = document.createElement('option');
        option.value = zone;
        option.textContent = zone.replace(/_/g, ' ').replace('/', ' / ');
        timezoneSelector.appendChild(option);
    });
});

