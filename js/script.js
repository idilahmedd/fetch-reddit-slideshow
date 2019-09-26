var button;
var searchTerm;
var show;
var splash;
var content;
//this holds the users search phrase
var searchTerm = ''; 
var firstPart = "http://www.reddit.com/search.json?q=";
var lastPart ="+nsfw:no";
var url = '';
var imageIndex = 0;
var handle = null;

//this event fires when the page is fully loaded
document.addEventListener('DOMContentLoaded', function(){
  button = document.getElementById('searchbutton');
  searchBox = document.getElementById('searchterm');
  show = document.getElementById('show');
  splash = document.getElementById('splash');
  content = document.getElementById('content');

  button.addEventListener('click', function(e) {
    searchTerm= searchBox.value;
    searchBox.value = '';
    splash.classList.remove('visible');
    splash.classList.add('hidden');
    content.classList.add('visible');
    content.classList.remove('hidden');
    url = firstPart + searchTerm + lastPart;
    fetch(url)
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        var newThumbs = json.data.children.map(function(thumb) {
          return thumb.data.thumbnail;
        });
        show.src = newThumbs[0];
        handle = setInterval(function() {
          imageIndex++;
          show.src = newThumbs[imageIndex];
        }, 3000);
      });
  });
})

