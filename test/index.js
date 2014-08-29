var test = require('tape');
var converter = require('../lib/converter');
var resumeJson = require('../example/resume.json');

test('Test converter on resume.json.', function(t) {
    converter(resumeJson, function(report, err) {
        t.plan(1);
        t.equal(err, null, 'no error');
    });
});