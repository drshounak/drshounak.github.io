function appendMessage(role, content) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = role;
    messageDiv.textContent = content;
    chatBox.appendChild(messageDiv);

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value.trim();

    if (userMessage === '') {
        return;
    }

    appendMessage('user', userMessage);

    // Send user message to the Cloudflare Worker
    fetch('https://your-worker-domain.your-subdomain.workers.dev', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
    })
    .then(response => response.text())
    .then(data => {
        // Display the chatbot's response
        appendMessage('bot', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Clear the user input field
    userInput.value = '';
}
