var fs = require('fs');
var Mustache = require('mustache');
var path = require('path');
var resumeSchema = require('resume-schema');

var resumeTemplate = fs.readFileSync(path.resolve(__dirname, '../layout.template'), 'utf8');
function resumeToMarkdown(resumeObject, callback) {
    resumeSchema.validate(resumeObject, function(report, errs) {
        if (!errs) {
        	for (var i = 0; i < resumeObject.basics.profiles.length; i++) {
    			if (!resumeObject.basics.profiles[i].url) {
    				switch (resumeObject.basics.profiles[i].network.toLowerCase()) {
    					case 'twitter':
    						resumeObject.basics.profiles[i].url = 'https://twitter.com/' + resumeObject.basics.profiles[i].username;
                            break;
    				}
    			}
        	}

            for (var i = 0; i < resumeObject.work.length-1; i++) {
                resumeObject.work[i].workHR = true;
            }

            for (var i = 0; i < resumeObject.education.length-1; i++) {
                resumeObject.education[i].educationHR = true;
            }

            for (var i = 0; i < resumeObject.volunteer.length-1; i++) {
                resumeObject.volunteer[i].volunteerHR = true;
            }

            var resumeMarkdown = Mustache.render(resumeTemplate, resumeObject);
            callback(resumeMarkdown, null);
        } else {
            callback(null, errs)
        }
    });
}

module.exports = resumeToMarkdown;