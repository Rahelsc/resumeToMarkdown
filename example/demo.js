var resumeToMarkdown = require('..');
var fs = require('fs');
var path = require('path');
var resumeObject = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'resume.json'), 'utf8'));

resumeToMarkdown(resumeObject, function (markdown, errs) {
	fs.writeFileSync('demo.md', markdown, 'utf8');
});
