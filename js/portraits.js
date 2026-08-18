// Get the gallery container
const gallery = document.getElementById("portraitGallery");

// Create the search area
const searchContainer = document.createElement("div");
searchContainer.id = "portraitSearch";

const searchTitle = document.createElement("div");
searchTitle.className = "portrait-search-title";
searchTitle.textContent = "Search or scroll";

const searchFields = document.createElement("div");
searchFields.className = "portrait-search-fields";

// First name
const firstNameGroup = document.createElement("div");
firstNameGroup.className = "search-field-group";

const firstNameLabel = document.createElement("label");
firstNameLabel.textContent = "First Name";
firstNameLabel.setAttribute("for", "firstNameSearch");

const firstNameInput = document.createElement("input");
firstNameInput.type = "text";
firstNameInput.id = "firstNameSearch";
firstNameInput.placeholder = "Enter first name";

firstNameGroup.appendChild(firstNameLabel);
firstNameGroup.appendChild(firstNameInput);

// Last name
const lastNameGroup = document.createElement("div");
lastNameGroup.className = "search-field-group";

const lastNameLabel = document.createElement("label");
lastNameLabel.textContent = "Last Name";
lastNameLabel.setAttribute("for", "lastNameSearch");

const lastNameInput = document.createElement("input");
lastNameInput.type = "text";
lastNameInput.id = "lastNameSearch";
lastNameInput.placeholder = "Enter last name";

lastNameGroup.appendChild(lastNameLabel);
lastNameGroup.appendChild(lastNameInput);

// Add fields to search area
searchFields.appendChild(firstNameGroup);
searchFields.appendChild(lastNameGroup);

const searchHint = document.createElement("div");
searchHint.className = "portrait-search-hint";
searchHint.textContent = "Type all or part of a name — results update as you type.";

searchContainer.appendChild(searchTitle);
searchContainer.appendChild(searchFields);
searchContainer.appendChild(searchHint);

// Put search area above the gallery
gallery.parentNode.insertBefore(searchContainer, gallery);


// Load the JSON file
fetch("data/students.json")
    .then(response => response.json())
    .then(students => {

        // Sort alphabetically by filename (last name first)
        students.sort((a, b) => a.file.localeCompare(b.file));


        // Function to display portraits
        function displayPortraits(list) {

            gallery.innerHTML = "";

            list.forEach(student => {

                const card = document.createElement("div");
                card.className = "portrait-card";

                const img = document.createElement("img");

                const normalImage = "portraits/" + student.file;
                const colorizedImage = "colorized/" + student.file;

                img.src = normalImage;
                img.alt = student.full_name;
                img.title = student.full_name;

                // Change to colorized image when mouse enters
                card.addEventListener("mouseenter", function () {
                    img.src = colorizedImage;
                });

                // Change back to black & white when mouse leaves
                card.addEventListener("mouseleave", function () {
                    img.src = normalImage;
                });

                card.appendChild(img);
                gallery.appendChild(card);

            });

            // Show message if there are no matches
            if (list.length === 0) {
                const noResults = document.createElement("p");
                noResults.textContent = "No portraits found.";
                noResults.className = "no-results";
                gallery.appendChild(noResults);
            }
        }


        // Display all portraits when the page loads
        displayPortraits(students);


        // Search function
        function searchPortraits() {

            const firstSearch = firstNameInput.value.trim().toLowerCase();
            const lastSearch = lastNameInput.value.trim().toLowerCase();

            // If both boxes are empty, show everyone
            if (firstSearch === "" && lastSearch === "") {
                displayPortraits(students);
                return;
            }

            const matches = students.filter(student => {

                const nameParts = student.full_name.trim().toLowerCase().split(/\s+/);

                // First name = first word
                const firstName = nameParts[0];

                // Last name = last word
                const lastName = nameParts[nameParts.length - 1];

                const firstMatch =
                    firstSearch === "" ||
                    firstName.startsWith(firstSearch);

                const lastMatch =
                    lastSearch === "" ||
                    lastName.startsWith(lastSearch);

                // Both conditions must be true when both boxes are used
                return firstMatch && lastMatch;
            });

            displayPortraits(matches);
        }


        // Search as the user types
        firstNameInput.addEventListener("input", searchPortraits);
        lastNameInput.addEventListener("input", searchPortraits);


        console.log(`Loaded ${students.length} senior portraits.`);

    })
    .catch(error => {
        console.error("Unable to load students.json", error);
    });