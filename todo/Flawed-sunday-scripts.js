// Predetermined hashed password (example value)
var predeterminedHashedPassword = '27335363faec9e8430281a6615cc1a893162459f563f9c8842234783d4daa413'; // Replace this with your actual predetermined hashed password

// Variable to keep track of login attempts and timestamps
var loginAttempts = parseInt(localStorage.getItem('loginAttempts')) || 0;
var lastLoginAttemptTimestamp = parseInt(localStorage.getItem('lastLoginAttemptTimestamp')) || 0;

document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the login button
    document.getElementById('login').addEventListener('click', function() {
        // Check if the user is attempting to log in too frequently
        if (!canAttemptLogin()) {
            // Display a message to the user indicating login attempts are restricted
            alert('You tried too hard buddy you can just ask for it if you know who to ask.');
            return;
        }

        var username = document.getElementById('username').value;
        var inputPassword = document.getElementById('password').value;
        var hashedPassword = CryptoJS.SHA256(inputPassword).toString(); // Hash the input password using SHA-256

        // Compare the hashed password with the predetermined hashed password
        if (username === 'Sonu' && hashedPassword === predeterminedHashedPassword) {
            // Call the function to handle login and session management
            handleLogin();

            // Hide the login screen and show the content
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('content').style.display = 'block';

            // Start the auto logout timer (every Sunday at 11:30 pm)
            startAutoLogoutTimer();
        } else {
            // Increment login attempts
            loginAttempts++;

            // Update last login attempt timestamp
            lastLoginAttemptTimestamp = Date.now();
            localStorage.setItem('loginAttempts', loginAttempts);
            localStorage.setItem('lastLoginAttemptTimestamp', lastLoginAttemptTimestamp);

            // Check if the maximum login attempts (5) is reached
            if (loginAttempts >= 5) {
                // Display a message to the user indicating login attempts exceeded
                alert('Wow you have managed to exceed max login attempts. Sorry buddy Further attempts are restricted for 1 hour.');
                // Disable login button for 1 hour
                disableLoginButtonForOneHour();
            } else {
                // Display an error message for incorrect credentials
                alert('Invalid credentials. Do you even know the password ? If no, you can just ask for it. Attempt ' + loginAttempts + ' out of 5.');
            }
        }
    });

    
    // Check if the user is already logged in and display the appropriate content
    var isLoggedIn = localStorage.getItem('loggedIn');
    var expirationTime = parseInt(localStorage.getItem('expirationDate'));

    if (isLoggedIn === 'true' && expirationTime && expirationTime > Date.now()) {
        // User is already logged in and the session is still valid, so display the content
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    } else {
        // User is not logged in or the session has expired, show the login screen
        document.getElementById('login-screen').style.display = 'block';
        document.getElementById('content').style.display = 'none';
    }

    // Function to handle login and session management
    function handleLogin() {
        // Set expiration time to 7 days from now or Sunday at 11:30 pm, whichever comes first
        var expirationDate = new Date();
        var currentDay = expirationDate.getDay();
        if (currentDay === 0) {
            // If today is Sunday, set expiration time to 11:30 pm
            expirationDate.setHours(23, 30, 0, 0);
        } else {
            // Set expiration time to 7 days from now
            expirationDate.setDate(expirationDate.getDate() + 7);
        }

        // Store login status and expiration time in localStorage
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('expirationDate', expirationDate.getTime());

        // Refresh last login attempt timestamp after 1 week (7 days)
        setTimeout(function() {
            lastLoginAttemptTimestamp = Date.now();
            localStorage.setItem('lastLoginAttemptTimestamp', lastLoginAttemptTimestamp);
        }, 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds
    }

    // Function to check if login attempts are allowed
    function canAttemptLogin() {
        // If no login attempts or less than 5 attempts, allow login
        if (loginAttempts < 5) {
            return true;
        }

        // If it has been more than 1 hour since the last login attempt, allow login
        var currentTime = Date.now();
        if (currentTime - lastLoginAttemptTimestamp > 60 * 60 * 1000) {
            // Reset login attempts and last login attempt timestamp
            loginAttempts = 0;
            lastLoginAttemptTimestamp = currentTime;
            localStorage.setItem('loginAttempts', loginAttempts);
            localStorage.setItem('lastLoginAttemptTimestamp', lastLoginAttemptTimestamp);
            return true;
        }

        // Login attempts are restricted
        return false;
    }

    // Function to disable the login button for 1 hour
    function disableLoginButtonForOneHour() {
        document.getElementById('login').disabled = true;
        setTimeout(function() {
            // Enable the login button after 1 hour
            document.getElementById('login').disabled = false;
        }, 60 * 60 * 1000); // 1 hour in milliseconds
    }

    // Function to start the auto logout timer (every Sunday at 11:30 pm)
    function startAutoLogoutTimer() {
        setInterval(function() {
            var today = new Date();
            if (today.getDay() === 0 && today.getHours() === 23 && today.getMinutes() === 30) {
                // It's Sunday at 11:30 pm, log out the user
                logoutUser();
            }
        }, 60000); // Check every minute (60 seconds * 1000 milliseconds)
    }

    // Function to log out the user
    function logoutUser() {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('expirationDate');
        document.getElementById('login-screen').style.display = 'block';
        document.getElementById('content').style.display = 'none';
        alert('Sunday Funday, yeeeh. You have worked hard buddy. Get some sleep.');
    }
});
