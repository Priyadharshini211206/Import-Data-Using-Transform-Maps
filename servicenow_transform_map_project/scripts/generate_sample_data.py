"""Generates the sample spreadsheets used in Phase 1 and Phase 7."""
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill

HEADERS = ["Employee ID", "Employee Name", "Email", "Department", "Location"]

INITIAL = [
    ["SB-0001", "Raviteja", "test10@gmail.com", "IT", "Hyderabad"],
    ["SB-0002", "Priya", "test11@gmail.com", "HR", "Chennai"],
    ["SB-0003", "Karthik", "test12@gmail.com", "Finance", "Bangalore"],
    ["SB-0004", "Ajay kumar", "test13@gmail.com", "IT", "Hyderabad"],
    ["SB-0005", "Meena", "test14@gmail.com", "Sales", "Chennai"],
    ["SB-0006", "Suresh", "test15@gmail.com", "HR", "Bangalore"],
]

# Phase 7: 2 existing IDs changed (update) + 2 new IDs (insert)
UPDATED = [
    ["SB-0001", "Raviteja", "test18@gmail.com", "IT", "Hyderabad"],   # email changed
    ["SB-0004", "Ajay", "test13@gmail.com", "IT", "Hyderabad"],       # name changed
    ["SB-0007", "Divya", "test16@gmail.com", "Finance", "Chennai"],   # new
    ["SB-0008", "Arun", "test17@gmail.com", "Sales", "Bangalore"],    # new
]

def build(path, rows):
    wb = Workbook()
    ws = wb.active
    ws.title = "Sheet1"          # Phase 7: Sheet number 1, Header row 1
    ws.append(HEADERS)
    for c in ws[1]:
        c.font = Font(name="Arial", bold=True, color="FFFFFF")
        c.fill = PatternFill("solid", fgColor="1F4E78")
    for r in rows:
        ws.append(r)
    for row in ws.iter_rows(min_row=2):
        for c in row:
            c.font = Font(name="Arial")
    for col, w in zip("ABCDE", [14, 20, 26, 16, 16]):
        ws.column_dimensions[col].width = w
    wb.save(path)

if __name__ == "__main__":
    build("../data/Sample Spreadsheet.xlsx", INITIAL)
    build("../data/Sample Spreadsheet - Updated.xlsx", UPDATED)
    print("Sample spreadsheets created.")
