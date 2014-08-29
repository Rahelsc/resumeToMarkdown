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
                    var url = '';
    				switch (resumeObject.basics.profiles[i].network.toLowerCase()) {
    					case 'twitter':
    						url = 'https://twitter.com/';
                            break;
                        case 'github':
                            url = 'https://github.com/';
                            break;
                        case 'linkedin':
                            url = 'https://linkedin.com/in/';
                            break;
                        case 'soundcloud':
                            url = 'https://soundcloud.com/';
                            break;
                        case 'pinterest':
                            url = 'http://www.pinterest.com/';
                            break;
                        case 'youtube':
                            url = 'https://www.youtube.com/user/'
                            break;
    				}
                    resumeObject.basics.profiles[i].url = url + resumeObject.basics.profiles[i].username;
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

            for (var i = 0; i < resumeObject.awards.length-1; i++) {
                resumeObject.awards[i].awardsHR = true;
            }

            for (var i = 0; i < resumeObject.publications.length-1; i++) {
                resumeObject.publications[i].publicationsHR = true;
            }
            
            for (var i = 0; i < resumeObject.skills.length; i++) {
                for (var ii = 0; ii < resumeObject.skills[i].keywords.length-1; ii++) {
                    resumeObject.skills[i].keywords[ii] += ', ';
                }
            }

            for (var i = 0; i < resumeObject.skills.length-1; i++) {
                resumeObject.skills[i].skillsHR = true;
            }

            for (var i = 0; i < resumeObject.languages.length-1; i++) {
                resumeObject.languages[i].languagesHR = true;
            }

            for (var i = 0; i < resumeObject.interests.length; i++) {
                for (var ii = 0; ii < resumeObject.interests[i].keywords.length-1; ii++) {
                    resumeObject.interests[i].keywords[ii] += ', ';
                }
            }

            for (var i = 0; i < resumeObject.interests.length-1; i++) {
                resumeObject.interests[i].interestsHR = true;
            }

            var resumeMarkdown = Mustache.render(resumeTemplate, resumeObject);
            callback(resumeMarkdown, null);
        } else {
            callback(null, errs)
        }
    });
}

module.exports = resumeToMarkdown;