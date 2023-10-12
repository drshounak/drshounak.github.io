function hashPassword(password) {
    var hash = 0, i, chr;
    for (i = 0; i < password.length; i++) {
        chr   = password.charCodeAt(i);
        hash  = (hash << 5) - hash + chr;
    }
    return hash.toString(16);
}

document.getElementById('login').addEventListener('click', function() {
    var username = document.getElementById('username').value;
    var inputPassword = document.getElementById('password').value;
    var hashedPassword = hashPassword(inputPassword); // Hash the input password

    // Replace 'hashedPassword' with the actual hashed password stored in your database
    if (username === 'Sonu' && hashedPassword === 'cf7ea2fbb') {
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
