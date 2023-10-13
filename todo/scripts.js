// Predetermined hashed password (example value)
var predeterminedHashedPassword = '27335363faec9e8430281a6615cc1a893162459f563f9c8842234783d4daa413'; // Replace this with your actual predetermined hashed password

document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the login button
    document.getElementById('login').addEventListener('click', function() {
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
        } else {
            alert('Invalid credentials. Please try again.');
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

    // Automatically log out the user every Sunday at 11:30 pm
    function checkLogoutTime() {
        var today = new Date();
        if (today.getDay() === 0 && today.getHours() === 23 && today.getMinutes() === 30) {
            // It's Sunday at 11:30 pm, log out the user
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('expirationDate');
            document.getElementById('login-screen').style.display = 'block';
            document.getElementById('content').style.display = 'none';
            alert('You have been logged out due to session expiration.');
        }
    }

    // Check the logout time every minute
    setInterval(checkLogoutTime, 60000); // Check every minute (60 seconds * 1000 milliseconds)
});

// Function to handle login and session management
function handleLogin() {
    // Set expiration time to 7 days from now
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    // Store login status and expiration time in localStorage
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('expirationDate', expirationDate.getTime());

    // Additional logic for handling the user session can be added here
}
