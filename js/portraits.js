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

        console.log(`Loaded ${students.length} senior portraits.`);

    })
    .catch(error => {
        console.error("Unable to load students.json", error);
    });