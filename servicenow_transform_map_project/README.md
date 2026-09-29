# Import Data using Transform Maps (Spreadsheet) - ServiceNow

Micro project: import employee data from an Excel spreadsheet into ServiceNow using
an Import Set (staging table) and a Transform Map, with Coalesce to prevent duplicates,
then build reports on the result.

## Folder structure

```
data/
  Sample Spreadsheet.xlsx              Phase 1 - initial 6 employee rows
  Sample Spreadsheet - Updated.xlsx    Phase 7 - 2 updated rows + 2 new rows
scripts/
  generate_sample_data.py              Python - regenerates both spreadsheets
  01_create_employee_test_table.js     Phase 2 - table u_employee_test + 5 columns
  02_create_import_set_table.js        Phase 3 - staging table u_employee_import (optional)
  03_create_transform_map.js           Phase 4 and 6 - transform map, field maps, coalesce
  04_create_reports.js                 Phase 8 - 3 reports
docs/
  Import_Data_using_Transform_Maps.docx   Original step-by-step document
```

## How to use

1. Run the `.js` scripts in order from **System Definition > Scripts - Background**
   (or follow the manual UI steps in the .docx).
2. Import `data/Sample Spreadsheet.xlsx` via **System Import Sets > Load Data**
   (Sheet number 1, Header row 1), then run the transform.
3. Import `data/Sample Spreadsheet - Updated.xlsx` the same way.
   Expected transform history: 2 inserted, 2 updated.
4. Import the same updated file again. Expected: 0 inserted, 0 updated, 4 ignored.

## Notes

- Scripts are written from the steps in the document; field names follow ServiceNow's
  `u_` convention. Test on a Personal Developer Instance first, since script-created
  tables and reports can differ slightly between releases.
- The UI method in the document is the most reliable way to create tables and reports.
