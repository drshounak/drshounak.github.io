// Predetermined hashed password (example value)
var predeterminedHashedPassword = '27335363faec9e8430281a6615cc1a893162459f563f9c8842234783d4daa413'; // Replace this with your actual predetermined hashed password

// Variable to keep track of login attempts and timestamps
var loginAttempts = 0;
var lastLoginAttemptTimestamp = null;

document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the login button
    document.getElementById('login').addEventListener('click', function() {
        // Check if the user is attempting to log in too frequently
        if (!canAttemptLogin()) {
            // Display a message to the user indicating login attempts are restricted
            alert('Login attempts are restricted. Please try again later.');
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

            // Start the auto logout timer (Sunday at 11:30 pm)
            startAutoLogoutTimer();
        } else {
            // Increment login attempts
            loginAttempts++;

            // Update last login attempt timestamp
            lastLoginAttemptTimestamp = new Date();

            // Check if the maximum login attempts (5) is reached
            if (loginAttempts >= 5) {
                // Display a message to the user indicating login attempts exceeded
                alert('Maximum login attempts exceeded. Further attempts are restricted for 1 hour.');
                // Disable login button for 1 hour
                disableLoginButtonForOneHour();
            } else {
                // Display an error message for incorrect credentials
                alert('Invalid credentials. Please try again. Attempt ' + loginAttempts + ' out of 5.');
            }
        }
    });

    // Rest of your code...
});

// Function to handle login and session management
function handleLogin() {
    // Set expiration time to 7 days from now
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    // Store login status and expiration time in localStorage
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('expirationDate', expirationDate.getTime());

    // Refresh last login attempt timestamp after 1 week (7 days)
    setTimeout(function() {
        lastLoginAttemptTimestamp = new Date();
    }, 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds
}

// Function to check if login attempts are allowed
function canAttemptLogin() {
    // If no login attempts or less than 5 attempts, allow login
    if (loginAttempts < 5) {
        return true;
    }

    // If it has been more than 1 hour since the last login attempt, allow login
    var currentTime = new Date();
    if (lastLoginAttemptTimestamp && currentTime - lastLoginAttemptTimestamp > 60 * 60 * 1000) {
        // Reset login attempts and last login attempt timestamp
        loginAttempts = 0;
        lastLoginAttemptTimestamp = null;
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
    alert('You have been logged out due to session expiration.');
}

