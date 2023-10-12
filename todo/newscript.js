document.getElementById('login').addEventListener('click', function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === 'Sonu' && password === 'Icisidhu') {
        // Store the login status in sessionStorage
        sessionStorage.setItem('loggedIn', 'true');
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    } else {
        alert('Invalid credentials. Please try again.');
    }
});

// Check if the user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    var isLoggedIn = sessionStorage.getItem('loggedIn');
    if (isLoggedIn === 'true') {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    }
});
