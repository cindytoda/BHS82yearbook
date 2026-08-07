// Get the gallery container
const gallery = document.getElementById("portraitGallery");

// Load the JSON file
fetch("data/students.json")
    .then(response => response.json())
    .then(students => {

        // Sort alphabetically by filename (last name first)
        students.sort((a, b) => a.file.localeCompare(b.file));

        // Build the gallery
        students.forEach(student => {

            const card = document.createElement("div");
            card.className = "portrait-card";

            const img = document.createElement("img");
            img.src = "portraits/" + student.file;
            img.alt = student.full_name;
            img.title = student.full_name;

            card.appendChild(img);

            gallery.appendChild(card);

        });

        console.log(`Loaded ${students.length} senior portraits.`);

    })
    .catch(error => {
        console.error("Unable to load students.json", error);
    });