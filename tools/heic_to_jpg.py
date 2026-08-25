import os
import tkinter as tk
from tkinter import filedialog, messagebox
from PIL import Image
import pillow_heif

pillow_heif.register_heif_opener()


def convert_images():
    # Let the user choose the folder containing the HEIC files
    source_folder = filedialog.askdirectory(
        title="Select the folder containing your HEIC images"
    )

    if not source_folder:
        return

    # Create a JPG folder inside the selected folder
    output_folder = os.path.join(source_folder, "JPG")
    os.makedirs(output_folder, exist_ok=True)

    # Find HEIC/HEIF files
    heic_files = [
        f for f in os.listdir(source_folder)
        if f.lower().endswith((".heic", ".heif"))
    ]

    if not heic_files:
        messagebox.showinfo(
            "No HEIC Files",
            "No HEIC or HEIF files were found in that folder."
        )
        return

    converted = 0
    errors = []

    for filename in heic_files:
        source_path = os.path.join(source_folder, filename)

        # Change extension to JPG
        base_name = os.path.splitext(filename)[0]
        output_path = os.path.join(output_folder, base_name + ".jpg")

        try:
            image = Image.open(source_path)

            # Convert to RGB for JPG
            if image.mode != "RGB":
                image = image.convert("RGB")

            image.save(output_path, "JPEG", quality=95)

            converted += 1

        except Exception as e:
            errors.append(f"{filename}: {e}")

    # Report results
    if errors:
        messagebox.showwarning(
            "Conversion Complete",
            f"Converted: {converted}\n"
            f"Errors: {len(errors)}\n\n"
            f"The JPG files are in:\n{output_folder}"
        )
    else:
        messagebox.showinfo(
            "Conversion Complete",
            f"Successfully converted {converted} images!\n\n"
            f"The JPG files are in:\n{output_folder}"
        )


# Create the window
root = tk.Tk()
root.title("HEIC to JPG Converter")
root.geometry("500x250")
root.resizable(False, False)

title = tk.Label(
    root,
    text="HEIC → JPG Converter",
    font=("Arial", 20, "bold")
)
title.pack(pady=(35, 10))

instructions = tk.Label(
    root,
    text="Choose the folder containing your iPhone HEIC images.",
    font=("Arial", 11)
)
instructions.pack(pady=5)

convert_button = tk.Button(
    root,
    text="Choose Folder & Convert",
    font=("Arial", 12, "bold"),
    padx=20,
    pady=10,
    command=convert_images
)
convert_button.pack(pady=25)

root.mainloop()