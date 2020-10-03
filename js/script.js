var player;
var currentId;

var input = document.querySelector("input");

function playVideoWithThisQuery(query) {
  if (!player) {
    return;
  }

  var isUrl = /^(http|https)/g.test(query);

  var id = null;

  if (isUrl) {
    var endpoint = new URL(query);

    id = endpoint.searchParams.get("v");
  } else {
    id = query;
  }

  currentId = id;
  
  setGetParam("video", id);

  player.loadVideoById(id);
}
      
window.onload = function() {
  var params = new URLSearchParams(window.location.search);
        
  var query = params.get("v") || params.get("video") || params.get("url");
        
  if (!query) {
    return;
  }
        
  input.value = query;
        
  playVideoWithThisQuery(query);
}

input.onchange = ({ target: { value } }) => {
  playVideoWithThisQuery(value);
};

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "360",
    width: "640",
    events: {
      onReady: function () {},
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerStateChange() {
  if (player.getPlayerState() === 0) {
    playVideoWithThisQuery(currentId);
  }
}
      
function setGetParam(key, value) {
  if (history.pushState) {
    var params = new URLSearchParams(window.location.search);
          
    params.set(key, value);
    
    var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params.toString();
    
    window.history.pushState({ path: newUrl }, '', newUrl);
  }
}
