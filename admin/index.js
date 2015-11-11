var GH = require('./upload.js'),
    render = require('../theme/index.js').render;

function get(url, cb){
	var xhr = new XMLHttpRequest();
	xhr.open('get', url);
	xhr.onreadystatechange = function(e){
		if (xhr.response){
			cb(JSON.parse(xhr.response));
		}
	}
	xhr.send();
}
var data = {};

function upload (){
	render(data, GH.write);
	GH.push({name : "Paul Martin", email : 'codemobius@gmail.com'}, "commit message");
}

GH.init("MobiusHorizons/awesome-cms", "f4555d6995c09fafa67079326afefd1f9cdd9f51");
function localRender(){
	upload();
}

get('../api/posts.json', function(p){
	console.log(p);
	data.posts = p;
	if (data.templates){
		localRender();
	}
});

get('../api/templates.json', function(t){
	data.templates = t;
	if (data.posts){
		localRender();
	}
});
