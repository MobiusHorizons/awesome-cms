var GH    = require('./upload.js'),
    theme = require('../../theme/index.js'),
    ui    = require('./ui.js'),
    ajax  = require('./ajax.js')
;

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

function save(){
  theme.render(data, GH.write);
  GH.push({"name" : "Paul Martin", "email" : "codemobius@gmail.com"}, "update post 0");
}

//GH.init("MobiusHorizons/awesome-cms", "f4555d6995c09fafa67079326afefd1f9cdd9f51");
Promise.all([
    ajax.get('../api/posts.json'),
    ajax.get('../api/templates.json')
]).then(function(apidata){
  data.posts = apidata[0];
  data.templates = apidata[1];
  ui.init(data, save)
}, function(error){
    console.log(error);
});
