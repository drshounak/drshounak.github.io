document.addEventListener('DOMContentLoaded', function() {
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');

  sendButton.addEventListener('click', function() {
    const userMessage = userInput.value;
    if (userMessage.trim() === '') return;

    // Display user message
    appendMessage('user', userMessage);

    // Send user message to the server and get response
    fetchChatbotResponse(userMessage);
    
    // Clear input field
    userInput.value = '';
  });

  function appendMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    messageDiv.textContent = content;
    chatMessages.appendChild(messageDiv);

    // Scroll to the bottom of the chat container
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function fetchChatbotResponse(userMessage) {
    try {
      const response = await fetch(`https://chat-backend.shounak.in/chat?message=${encodeURIComponent(userMessage)}`);
      const data = await response.json();
      const chatbotResponse = data.response;

      // Display chatbot response
      appendMessage('chatbot', chatbotResponse);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
    }
  }
});
