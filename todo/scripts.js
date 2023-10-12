// Predetermined hashed password (example value)
var predeterminedHashedPassword = '27335363faec9e8430281a6615cc1a893162459f563f9c8842234783d4daa413'; // Replace this with your actual predetermined hashed password

document.getElementById('login').addEventListener('click', function() {
    var username = document.getElementById('username').value;
    var inputPassword = document.getElementById('password').value;
    var hashedPassword = CryptoJS.SHA256(inputPassword).toString(); // Hash the input password using SHA-256

    // Compare the hashed password with the predetermined hashed password
    if (username === 'Sonu' && hashedPassword === predeterminedHashedPassword) {
        // Store the login status in session storage
        sessionStorage.setItem('loggedIn', 'true');
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    } else {
        alert('Invalid credentials. Please try again.');
    }

    // Rest of your login logic
});

document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is already logged in
    var isLoggedIn = sessionStorage.getItem('loggedIn');
    if (isLoggedIn === 'true') {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    }
});
