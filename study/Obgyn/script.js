// Load existing topics from localStorage when the page loads
window.onload = function() {
    var savedTopics = JSON.parse(localStorage.getItem('topics')) || [];
    var topicsBody = document.getElementById("topicsBody");

    savedTopics.forEach(function(topic) {
        // Parse topic data (including checkbox states) from local storage
        var [topicName, isChecked1, isChecked2, isChecked3, isChecked4] = topic;
        // Add topic to the table with checkbox states
        addTopicToTable(topicName, isChecked1, isChecked2, isChecked3, isChecked4);
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

function addTopicToTable(topicName, isChecked1, isChecked2, isChecked3, isChecked4) {
    var topicsBody = document.getElementById("topicsBody");
    var newRow = topicsBody.insertRow();

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);

    cell1.innerHTML = `<strong>${topicName}</strong>`;

    var checkbox1 = document.createElement('input');
    checkbox1.type = 'checkbox';
    checkbox1.checked = isChecked1;
    checkbox1.addEventListener('change', saveTopics);
    cell2.appendChild(checkbox1);

    var checkbox2 = document.createElement('input');
    checkbox2.type = 'checkbox';
    checkbox2.checked = isChecked2;
    checkbox2.addEventListener('change', saveTopics);
    cell3.appendChild(checkbox2);

    var checkbox3 = document.createElement('input');
    checkbox3.type = 'checkbox';
    checkbox3.checked = isChecked3;
    checkbox3.addEventListener('change', saveTopics);
    cell4.appendChild(checkbox3);

    var checkbox4 = document.createElement('input');
    checkbox4.type = 'checkbox';
    checkbox4.checked = isChecked4;
    checkbox4.addEventListener('change', saveTopics);
    cell5.appendChild(checkbox4);

    cell6.innerHTML = '<span class="delete-button" onclick="deleteRow(this)">Delete</span>';
}


function saveTopics() {
    var topics = [];
    var rows = document.getElementById("topicsBody").rows;
    for (var i = 0; i < rows.length; i++) {
        var topicName = rows[i].cells[0].innerText;
        // Get checkbox states for each topic
        var isChecked1 = rows[i].cells[1].querySelector('input').checked;
        var isChecked2 = rows[i].cells[2].querySelector('input').checked;
        var isChecked3 = rows[i].cells[3].querySelector('input').checked;
        var isChecked4 = rows[i].cells[4].querySelector('input').checked;
        // Store topic data and checkbox states as an array
        topics.push([topicName, isChecked1, isChecked2, isChecked3, isChecked4]);
    }
    // Save topics to local storage
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
