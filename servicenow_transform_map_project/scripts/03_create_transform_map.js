/**
 * Phase 4 + Phase 6 - Transform Map "Sample Spreadsheet Import"
 *   Source: u_employee_import   ->   Target: u_employee_test
 *   Coalesce is enabled on Employee ID to avoid duplicate records.
 * Run in: System Definition > Scripts - Background (global scope)
 */
(function () {
    var MAP_NAME = 'Sample Spreadsheet Import';
    var SOURCE = 'u_employee_import';
    var TARGET = 'u_employee_test';

    var map = new GlideRecord('sys_transform_map');
    map.addQuery('name', MAP_NAME);
    map.query();
    if (!map.next()) {
        map.initialize();
        map.name = MAP_NAME;
        map.source_table = SOURCE;
        map.target_table = TARGET;
        map.run_business_rules = true;
        map.insert();
        gs.info('Created transform map: ' + MAP_NAME);
    }
    var mapId = map.getUniqueValue();

    // Field maps: source column -> target column
    var fieldMaps = [
        { source: 'u_employee_id',   target: 'u_employee_id',   coalesce: true  },
        { source: 'u_employee_name', target: 'u_employee_name', coalesce: false },
        { source: 'u_email',         target: 'u_email',         coalesce: false },
        { source: 'u_department',    target: 'u_department',    coalesce: false },
        { source: 'u_location',      target: 'u_location',      coalesce: false }
    ];

    fieldMaps.forEach(function (f) {
        var fm = new GlideRecord('sys_transform_entry');
        fm.addQuery('map', mapId);
        fm.addQuery('target_field', f.target);
        fm.query();
        if (!fm.next()) {
            fm.initialize();
            fm.map = mapId;
            fm.source_field = f.source;
            fm.target_field = f.target;
            fm.coalesce = f.coalesce;   // Phase 6: Coalesce = true on Employee ID
            fm.insert();
        } else {
            fm.coalesce = f.coalesce;
            fm.update();
        }
    });
    gs.info('Field maps configured for ' + MAP_NAME);
})();
