document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("obituaries-container");

    if (!container) {
        return;
    }

    fetch("data/obituaries.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Unable to load obituary data.");
            }
            return response.json();
        })
        .then(obituaries => {

            // Sort alphabetically by last name
            obituaries.sort((a, b) => {
                const lastNameA = a.name.trim().split(" ").pop();
                const lastNameB = b.name.trim().split(" ").pop();

                return lastNameA.localeCompare(lastNameB);
            });

            obituaries.forEach(obit => {

                const entry = document.createElement("div");
                entry.className = "obituary-entry";

                // If there is NO image, just show the name
                if (!obit.image) {

                    const nameOnly = document.createElement("div");
                    nameOnly.className = "obituary-name-only";
                    nameOnly.textContent = obit.name;

                    entry.appendChild(nameOnly);
                    container.appendChild(entry);

                    return;
                }

                // LEFT SIDE
                const leftColumn = document.createElement("div");
                leftColumn.className = "obituary-left";

                const image = document.createElement("img");
                image.src = obit.image;
                image.alt = obit.name;
                image.className = "obituary-photo";

                if (obit.story && obit.story.trim() !== "") {
                    image.style.cursor = "pointer";

                    image.addEventListener("click", function () {
                        showObituary(obit.story);
                    });
                }

                leftColumn.appendChild(image);

                // RIGHT SIDE
                const information = document.createElement("div");
                information.className = "obituary-information";

                const name = document.createElement("div");
                name.className = "obituary-name";
                name.textContent = obit.name;

                information.appendChild(name);

                if (obit.born && obit.born.trim() !== "") {

                    const born = document.createElement("div");
                    born.className = "obituary-detail";
                    born.textContent = "Born: " + obit.born;

                    information.appendChild(born);
                }

                if (obit.died && obit.died.trim() !== "") {

                    const died = document.createElement("div");
                    died.className = "obituary-detail";
                    died.textContent = "Died: " + obit.died;

                    information.appendChild(died);
                }

                entry.appendChild(leftColumn);
                entry.appendChild(information);

                container.appendChild(entry);
            });

        })
        .catch(error => {
            console.error("Obituary loading error:", error);
        });

});

function showObituary(obituaryImage) {

    // Create the overlay
    const overlay = document.createElement("div");
    overlay.className = "obituary-overlay";

    // Create the obituary image
    const image = document.createElement("img");
    image.src = obituaryImage;
    image.className = "obituary-full-image";

    // Create close button
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.className = "obituary-close";

    // Close the overlay
    closeButton.addEventListener("click", function () {
        overlay.remove();
    });

    // Also close if the dark background is clicked
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            overlay.remove();
        }
    });

    overlay.appendChild(image);
    overlay.appendChild(closeButton);

    document.body.appendChild(overlay);
}
