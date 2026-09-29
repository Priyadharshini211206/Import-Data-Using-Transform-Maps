/**
 * Phase 8 - Reports on the Employee Test table
 *   1. Employees by Department (Pie, Count, Group by Department)
 *   2. Employees by Location   (Bar,  Count, Group by Location)
 *   3. Employee List Report    (List with all 5 columns)
 * Run in: System Definition > Scripts - Background (global scope)
 */
(function () {
    var TABLE = 'u_employee_test';

    function createReport(name, type, groupBy, fields) {
        var r = new GlideRecord('sys_report');
        r.addQuery('title', name);
        r.query();
        if (r.next()) { gs.info('Report exists: ' + name); return; }

        r.initialize();
        r.title = name;
        r.table = TABLE;
        r.type = type;                      // pie | bar | list
        r.aggregate = 'COUNT';
        if (groupBy) r.field = groupBy;     // group-by field for charts
        if (fields) r.list_fields = fields; // comma-separated for list reports
        r.insert();
        gs.info('Created report: ' + name);
    }

    createReport('Employees by Department', 'pie',  'u_department', '');
    createReport('Employees by Location',   'bar',  'u_location',   '');
    createReport('Employee List Report',    'list', '',
        'u_employee_id,u_employee_name,u_email,u_department,u_location');
})();
