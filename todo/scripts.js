// Function to hash passwords
function hashPassword(password) {
    try {
        const salt = 'yCom20';
        const hashedPassword = crypto.createHash('sha256').update(password + salt).digest('hex');
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        return null;
    }
}
document.getElementById('login').addEventListener('click', function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Hash the input password
    var hashedInputPassword = hashPassword(password);

    // Compare hashed input password with stored hashed password
    if (username === 'Sonu' && hashedInputPassword === '37729a49cb919e2a75dbaa2f252a4a3de728d358db450f1d7bd433a02147d00b') {
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

