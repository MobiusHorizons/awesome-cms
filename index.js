var fs    = require('fs'),
	data  = require('./api'),
	theme = require('./theme/index.js');

theme.render(data, function(name, contents){
	console.log('writing "' + name + '"');
	fs.writeFile(name, contents, 'utf8');
});
