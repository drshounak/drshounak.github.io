document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Generate user ID by combining email and password
        const userId = `${email}${password}`;

        // Redirect to TODO page with the generated user ID as a query parameter
        window.location.href = `/template.html?userId=${userId}`;
    });
});
