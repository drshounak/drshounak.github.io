var currentYear = new Date().getFullYear();
    $("#current-year").text(currentYear);

    document.getElementById('ring-my-phone-btn').addEventListener('click', function() {
            // Reconstruct the phone number dynamically to obscure it
            var phoneNumber = '+91' + String.fromCharCode(
                517, 512, 515, 512, 513, 516, 513, 514, 516, 513
            ); // Decoded: +91332441139,

            // Initiate a phone call when the button is clicked
            window.location.href = 'tel:' + phoneNumber;
        });

        document.getElementById("patient-particulars-button").addEventListener("click", function() {
            document.getElementById("patient-particulars").scrollIntoView({ behavior: "smooth" });
        }); 

        document.getElementById("allergy-list-button").addEventListener("click", function() {
            document.getElementById("allergy-list").scrollIntoView({ behavior: "smooth" });
        });

  // JavaScript for search and other functionality
const drugList = [
    "Nimesulide",
    "Etoricoxib",
    "Aspirin",
    "Keterolac",
    "Paracetamol",
    "Aceclofenac",
    "Tramadol",
    "Analgin",
    "Piroxicam",
    "Ibuprofen",
    "Diclofenac",
    "Ofloxacin",
    "Sparfloxacin",
    "Chloramphenicol",
    "Cefadroxyl",
    "Cefaclor",
    "Cefpodixime",
    "Lomefloxacin",
    "Cefotaxime",
    "Gentamicin",
    "Cefuroxime",
    "Ciprofloxacin",
    "Norfloxacin",
    "Amoxycillin",
    "Ampicillin",
    "Oxytetracycline",
    "Bupivacaine",
    "Lignocaine",
    "Clindamycin",
    "Promethazin",
    "Ketotifen",
    "Amikacin",
    "Moxyfloxacin",
    "Doxycycline",
    "Cotrimoxazole",
    "Penicillin",
    "Azithromycin",
    "Clarithromycin",
    "Roxythromycin",
    "Erythromycin",
    "Lincomycin",
    "Cefdinir",
    "Gemifloxacin",
    "Cephalexin",
    "Cefixime",
    "Purifloxcin",
    "Nitrofurantoin",
    "Ceftriaxone",
    "Feropenem",
    "Lansoprazole",
    "Ornidazole",
    "Rabeprazole",
    "Pantoprazole",
    "Omeprazole",
    "Famotidine",
    "Satrogyl",
    "Metclopramide",
    "Ranitidine",
    "Ondancetron",
    "Metronidazole",
    "Tinidazole",
    "Secnidazole",
    "Albendazole",
    "Domperidone",
    "Mebendazole",
    "Rupadinine",
    "Cyproheptadine",
    "Montelukast",
    "Cetrizine",
    "Fexofenadine",
    "Desloratidine",
    "Levocetrizine",
    "Loraditine",
    "DEC",
    "Hydroxyzine HCL",
    "Ebastine",
    "Chlorphenaramine Melate",
    "Tetracycline",
    "Gatifloxacin",
    "Levofloxacin",
    "Bilastine",
    "",
    // Add more drug names here
];

function searchDrug() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const tables = document.getElementsByClassName("allergyTable"); // Use getElementsByClassName to select all tables

    for (let j = 0; j < tables.length; j++) {
        const rows = tables[j].getElementsByTagName("tr");

        for (let i = 1; i < rows.length; i++) { // Start from 1 to skip the table header row
            const drugName = rows[i].getElementsByTagName("td")[0].textContent.toLowerCase();
            if (drugName.includes(input)) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}
function clearSearch() {
    document.getElementById("searchInput").value = ""; // Clear the search input
    const tables = document.querySelectorAll(".allergyTable"); // Select all tables with the class "allergyTable"
    
    tables.forEach(table => {
        const rows = table.getElementsByTagName("tr");
        for (let i = 1; i < rows.length; i++) {
            rows[i].style.display = ""; // Reset the display for all rows
        }
    });
}

const searchInput = document.getElementById("searchInput");
const autocompleteList = document.getElementById("autocomplete-list");

searchInput.addEventListener("input", function() {
    const inputText = this.value.toLowerCase();
    autocompleteList.innerHTML = '';

    if (inputText.length === 0) {
        autocompleteList.style.display = 'none';
        return;
    }

    const matches = drugList.filter(drug => drug.toLowerCase().includes(inputText));
    if (matches.length === 0) {
        autocompleteList.style.display = 'none';
        return;
    }

    autocompleteList.style.display = 'block';
    matches.forEach(match => {
        const listItem = document.createElement('li');
        listItem.textContent = match;
        autocompleteList.appendChild(listItem);

        listItem.addEventListener('click', function() {
            searchInput.value = match;
            autocompleteList.style.display = 'none';
        });
    });
});
