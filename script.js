"use strict";
function $(e) {
  return document.getElementById(e);
}
function getText(path, onload) {
  const n = new XMLHttpRequest();
  n.open("GET", path);
  n.onload = onload;
  n.send(null);
}

$("button1").onclick = function() {
  getText("/sample.txt", function() {
    $("text1").textContent = this.responseText;
  });
};

$("button2").onclick = function() {
  $("img1").src = "/map.png";
};
