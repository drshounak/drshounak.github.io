// Load existing topics from localStorage when the page loads
window.onload = function() {
    var savedTopics = JSON.parse(localStorage.getItem('topics')) || [];
    var topicsBody = document.getElementById("topicsBody");

    savedTopics.forEach(function(topic) {
        addTopicToTable(topic);
    });
}

function addTopic() {
    var topicInput = document.getElementById("topicInput");
    var topicName = topicInput.value.trim();

    if (topicName === "") {
        alert("Please enter a topic name.");
        return;
    }

    addTopicToTable(topicName);

    // Save topics to localStorage
    saveTopics();

    // Clear the input field after adding a topic
    topicInput.value = "";
}

function addTopicToTable(topicName) {
    var topicsBody = document.getElementById("topicsBody");
    var newRow = topicsBody.insertRow();

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);

    cell1.innerHTML = `<strong>${topicName}</strong>`;
    cell2.innerHTML = '<input type="checkbox">';
    cell3.innerHTML = '<input type="checkbox">';
    cell4.innerHTML = '<input type="checkbox">';
    cell5.innerHTML = '<input type="checkbox">';
    cell6.innerHTML = '<span class="delete-button" onclick="deleteRow(this)">Delete</span>';
}

function saveTopics() {
    var topics = [];
    var rows = document.getElementById("topicsBody").rows;
    for (var i = 0; i < rows.length; i++) {
        topics.push(rows[i].cells[0].innerText);
    }
    localStorage.setItem('topics', JSON.stringify(topics));
}

// ... (previous JavaScript code) ...

// Modal functionality
var modal = document.getElementById("confirmationModal");
var confirmButton = document.getElementById("confirmDelete");
var cancelButton = document.getElementById("cancelDelete");

function showModal() {
    modal.style.display = "block";
}

function hideModal() {
    modal.style.display = "none";
}

// Event listener for Delete button click
function deleteRow(button) {
    var row = button.parentNode.parentNode;
    var topicName = row.cells[0].innerText;

    showModal(); // Show the modal when attempting to delete a topic

    confirmButton.onclick = function() {
        row.parentNode.removeChild(row);
        // Save topics to localStorage after deletion
        saveTopics();
        hideModal(); // Hide the modal after deletion
    };

    cancelButton.onclick = function() {
        hideModal(); // Hide the modal if the user cancels the deletion
    };
}

// ... (remaining JavaScript code) ...
