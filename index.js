var fs = require ('fs'),
	handlebars = require('handlebars'),
	markdown = require('markdown').markdown,
	posts = require('./api/posts.json'),
	templates = {
		post : handlebars.compile(fs.readFileSync('templates/post.tmpl.html').toString()),
		home : handlebars.compile(fs.readFileSync('templates/home.tmpl.html').toString())
	};

function slug(title){
	return title.replace(/[^A-Za-z0-9-]+/g, '-');
}

for ( var i = 0; i < posts.length; i++){
	var post = posts[i];
	posts[i].slug = slug(post.title);
	posts[i].html = markdown.toHTML( post.content );
	fs.writeFile("posts/" + post.slug + ".html",  templates['post'](post), 'utf8');
}

var homePage = templates['home']({posts : posts});
fs.writeFile('index.html', homePage, 'utf8');
