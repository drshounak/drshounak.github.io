document.getElementById('login').addEventListener('click', function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === 'Sonu' && password === 'Icisidhu') {
      document.getElementById('login-screen').style.display = 'none';
      document.getElementById('content').style.display = 'block';
    } else {
      alert('Invalid credentials. Please try again.');
    }
  });