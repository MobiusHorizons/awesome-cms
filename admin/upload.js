

 var repo = {};

var GH = module.exports = {};

var local = {
	updates : [],
};

GH.write = function(path, content, mode){
	mode = mode || 33188;
	local.updates.push({ path : path, mode : mode, content: content.toString()});
};

GH.init = function ( repoName, githubToken ){
	require('js-github/mixins/github-db')(repo, repoName, githubToken);
	require('js-git/mixins/create-tree')(repo);
	require('js-git/mixins/mem-cache')(repo);
	require('js-git/mixins/read-combiner')(repo);
	require('js-git/mixins/formats')(repo);
};

GH.push = function(author, message){
	var updates = local.updates;
	console.log(updates);
	repo.readRef("refs/heads/gh-pages", function(err, head){
		if (err) {console.log(err);}
		repo.loadAs("commit", head, function(err, commit){
			updates.base = commit.tree;
			repo.createTree(updates, function(err, treeHash){
				if (err) {console.log(err);}
				console.log("tree created", treeHash);
				var commit = {
					tree   : treeHash, 
					author : author,
					parent : head,
					message: message
				};
				console.log(JSON.stringify(commit, null, 2));
				repo.saveAs("commit", commit, function(err, commitHash){
					if (err) {
						console.log(err);
						return;
					}
					console.log("commit hash = ", commitHash);
					repo.updateRef("refs/heads/gh-pages", commitHash, function(err, newhash){
						console.log("done.", newhash);
					});
				});
			});
		});
	});
}

