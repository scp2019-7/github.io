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
function getQRimage(){
  var urlParam = location.search.substring(1);
  if(urlParam) {
    var param = urlParam.split('&');
    if (param.length == 1) {
      var Iname = param[0] + ".png";
    }
    return Iname;
  }
}

function getRootimage(sID,gID){
  var Iname = sID + "_" + gID + ".png";
  return Iname;
}

$("button1").onclick = function() {
  getText("./sample.txt", function() {
    $("text1").textContent = this.responseText;
  });
};

$("button2").onclick = function() {
  // $("img1").src = getQRimage();
  $("img1").src = "001.png";
};

$("button3").onclick = function() {
  var sID = "001";
  var gID = "002";
  $("img1").src = getRootimage(sID,gID);
};

