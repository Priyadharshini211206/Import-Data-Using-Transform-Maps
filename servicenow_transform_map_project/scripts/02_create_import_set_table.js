/**
 * Phase 3 - Import Set staging table "Employee Import" (u_employee_import)
 * NOTE: The document creates this through System Import Sets > Load Data,
 * which auto-creates the columns from the spreadsheet header row.
 * This script is an optional alternative to pre-create it by code.
 * Run in: System Definition > Scripts - Background (global scope)
 */
(function () {
    var TABLE = 'u_employee_import';

    function getSysId(name) {
        var g = new GlideRecord('sys_db_object');
        g.addQuery('name', name);
        g.query();
        return g.next() ? g.getUniqueValue() : '';
    }

    var tbl = new GlideRecord('sys_db_object');
    tbl.addQuery('name', TABLE);
    tbl.query();
    if (!tbl.next()) {
        tbl.initialize();
        tbl.name = TABLE;
        tbl.label = 'Employee Import';
        tbl.super_class = getSysId('sys_import_set_row');   // import set row parent
        tbl.insert();
        gs.info('Created import set table: ' + TABLE);
    }

    // Source columns (match the spreadsheet header labels)
    ['Employee ID', 'Employee Name', 'Email', 'Department', 'Location']
        .forEach(function (label) {
            var element = 'u_' + label.toLowerCase().replace(/ /g, '_');
            var dict = new GlideRecord('sys_dictionary');
            dict.addQuery('name', TABLE);
            dict.addQuery('element', element);
            dict.query();
            if (!dict.next()) {
                dict.initialize();
                dict.name = TABLE;
                dict.element = element;
                dict.column_label = label;
                dict.internal_type = 'string';
                dict.max_length = 100;
                dict.insert();
            }
        });
})();
