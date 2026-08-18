from pathlib import Path
import json

# The folder containing your reunion folders
SLIDESHOWS_FOLDER = Path(r"D:\BHS\BHS82-Yearbook\slideshows")

# Image types we'll include
IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp"
}


def create_json_files():
    # Make sure the slideshows folder exists
    if not SLIDESHOWS_FOLDER.exists():
        print(f"Folder not found:")
        print(SLIDESHOWS_FOLDER)
        return

    # Look at every folder inside "slideshows"
    for folder in sorted(SLIDESHOWS_FOLDER.iterdir()):

        # Skip anything that isn't a folder
        if not folder.is_dir():
            continue

        # Find image files
        images = [
            file.name
            for file in folder.iterdir()
            if file.is_file()
            and file.suffix.lower() in IMAGE_EXTENSIONS
        ]

        # Sort filenames
        images.sort(key=str.lower)

        # JSON filename
        json_file = SLIDESHOWS_FOLDER / f"{folder.name}.json"

        # Write JSON file
        with open(json_file, "w", encoding="utf-8") as f:
            json.dump(images, f, indent=2)

        print(f"{folder.name}: {len(images)} images")
        print(f"Created: {json_file}")
        print()


if __name__ == "__main__":
    create_json_files()

    print("Finished!")