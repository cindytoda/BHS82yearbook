import json
from pathlib import Path

# Change these paths if needed
PORTRAIT_FOLDER = Path("portraits")
JSON_FILE = Path("data/students.json")

# Read JSON
with open(JSON_FILE, "r", encoding="utf-8") as f:
    students = json.load(f)

json_files = {student["file"] for student in students}

folder_files = {p.name for p in PORTRAIT_FOLDER.glob("*.jpg")}

missing_from_json = sorted(folder_files - json_files)
missing_from_folder = sorted(json_files - folder_files)

print(f"Portrait JPGs : {len(folder_files)}")
print(f"JSON records  : {len(json_files)}")
print()

if missing_from_json:
    print("JPGs NOT listed in JSON:")
    for name in missing_from_json:
        print("  ", name)

print()

if missing_from_folder:
    print("JSON entries with missing JPG:")
    for name in missing_from_folder:
        print("  ", name)