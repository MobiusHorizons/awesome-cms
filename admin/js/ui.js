var GH = require('./upload.js');

function q(selector, justOne){
  if (justOne) { 
    return document.querySelector(selector);
  }
  return document.querySelectorAll(selector);
}

function bind(el, events, cb){
  el.addEventListener(events, cb);
}

var exports = module.exports = {
  init : function(data, save){
    console.log(data);
    if (localStorage && localStorage.githubToken){
      q('#github-token',true).value = localStorage.githubToken;
      GH.init('MobiusHorizons/awesome-cms', localStorage.githubToken);
    }

    var loginBtn = q('#github-init', true)

    bind(loginBtn, 'click', function(){
      var token = q('#github-token',true).value;
      GH.init('MobiusHorizons/awesome-cms', token);
      if (localStorage){
        localStorage.githubToken = token;
      }
    });
    post = {
      title   : q('input.title', true),
      author  : q('input.author', true),
      content : q('textarea.content', true)
    }
    post.title.value    = data.posts[0].title;
    post.author.value   = data.posts[0].author;
    post.content.value  = data.posts[0].content;

    bind(q('button.save', true), 'click', function(){
      data.posts[0].title = post.title.value;
      data.posts[0].author = post.author.value;
      data.posts[0].content = post.content.value;
      GH.write('api/posts.json', JSON.stringify(data.posts));
      save();
    });
  }
}
