/**
 * Phase 2 - Create custom table "Employee Test" (u_employee_test)
 * Run in: System Definition > Scripts - Background (global scope)
 */
(function () {
    var TABLE = 'u_employee_test';

    var tbl = new GlideRecord('sys_db_object');
    tbl.addQuery('name', TABLE);
    tbl.query();
    if (!tbl.next()) {
        tbl.initialize();
        tbl.name = TABLE;
        tbl.label = 'Employee Test';
        tbl.is_extendable = false;
        tbl.create_access_controls = true;
        tbl.insert();
        gs.info('Created table: ' + TABLE);
    } else {
        gs.info('Table already exists: ' + TABLE);
    }

    // Columns (all String)
    var fields = [
        { label: 'Employee ID',   name: 'u_employee_id' },
        { label: 'Employee Name', name: 'u_employee_name' },
        { label: 'Email',         name: 'u_email' },
        { label: 'Department',    name: 'u_department' },
        { label: 'Location',      name: 'u_location' }
    ];

    fields.forEach(function (f) {
        var dict = new GlideRecord('sys_dictionary');
        dict.addQuery('name', TABLE);
        dict.addQuery('element', f.name);
        dict.query();
        if (!dict.next()) {
            dict.initialize();
            dict.name = TABLE;
            dict.element = f.name;
            dict.column_label = f.label;
            dict.internal_type = 'string';
            dict.max_length = 100;
            dict.insert();
            gs.info('Created column: ' + f.name);
        }
    });
})();
