"use strict";
const $ = e => document.getElementById(e);

$("button1").onclick = function() {
  const formdata = new FormData();
  const n = new XMLHttpRequest();
  n.open("GET", "/sample.txt");
  n.onload = function() {
    $("text1").textContent = this.responseText;
  };
  n.send(formdata);
};

$("button2").onclick = function() {
  $("img1").src = "/map.png";
};
