var	handlebars = require('handlebars'),
	markdown = require('markdown').markdown;

module.exports = {
	render : function(data, write){
		var templates = {};

			for (t in data.templates){
				templates[t] = handlebars.compile(data.templates[t]);
			}


		function slug(title){
			return title.replace(/[^A-Za-z0-9-]+/g, '-');
		}

		for ( var i = 0; i < data.posts.length; i++){
			var post = data.posts[i];
			data.posts[i].slug = slug(post.title);
			data.posts[i].html = markdown.toHTML( post.content );
			write("posts/" + post.slug + ".html",  templates['post'](post));
		}

			var homePage = templates['home']({posts : data.posts});
			write('index.html', homePage);
	}
}
