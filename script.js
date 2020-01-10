"use strict";
function $(e) {
  return document.getElementById(e);
}

function getQRID() {
  var urlParam = location.search.substring(1);
  if (urlParam) {
    var param = urlParam.split("&");
    if (param.length == 1) {
      var QRID = param[0];
    }
    return QRID;
  }
}

function getRootimage(sID, gID) {
  var Iname = sID + "_" + gID + ".png";
  return Iname;
}

function csvToArray(path) {
        var csvData = new Array();
        var data = new XMLHttpRequest();        
        data.open("GET", path, false);
        data.send(null);
        var LF = String.fromCharCode(10);
        var lines = data.responseText.split(LF);
        for (var i = 0; i < lines.length;++i) {
                var cells = lines[i].split(",");
                if( cells.length != 1 ) {
                        csvData.push(cells);
                }
        }
        return csvData;
}

function QRID2index(QRID,QRdb){
  for (var i = 0; i < QRdb.length;++i) {
      if(QRdb[i][0]==QRID){
        var index = i;
    }
    return index;
}

var cur_QRID = getQRID();
var QRdb = csvToArray("database/qr_info.csv");
/*
var cur_QRindex = QRID2index(cur_QRID,QRdb);
var cur_x = QRdb[1][cur_QRindex];
var cur_y = QRdb[2][cur_QRindex];
*/
// sample root
var rootlist = [
  [100,120],
  [80,120],
  [80,160],
  [190,160],
  [190,200]
];
jQuery(function(){  
  jQuery('#text1').autocomplete({
    source: function(request, response){
      var suggests = [];
      var regexp = new RegExp('(' + request.term + ')');
      
      jQuery.each(QRdb, function(i, values){
        if(values[4].match(regexp)){
          suggests.push(values[4]);
        }
      });
      
      response(suggests);
    },
    autoFocus: true,
    delay: 300,
    minLength: 1
  });
});　

function kensaku() {
  document.getElementById("text2").innerText = document.getElementById("text1").value;
}

function hoge(code)
{
	//エンターキー押したら
	if(13 === code)
	{
		kensaku();
	}
}


window.onload = function() {
  var canvas = document.getElementById('axisCanvas');
  var canvasW = 200;
  var canvasH = 300;
  canvas.width = canvasW;
  canvas.height = canvasH;
  var image = new Image();
  let imagePath = "database/HonkanMap_1F.svg";
  image.src = imagePath;
  var ctx = canvas.getContext('2d'); 
  canvas.onclick = function(e) {
    
    ctx.clearRect(0, 0, canvasW, canvasH);
    
    var rect = e.target.getBoundingClientRect();
    var mouseX = e.clientX - Math.floor(rect.left) - 2;
    var mouseY = e.clientY - Math.floor(rect.top) - 2;

    // クリック位置を中心に円を描画
    
    ctx.beginPath();
    ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, canvasW, canvasH);
    ctx.fillStyle = 'hsl( 0, 100%, 50% )';
    ctx.arc(mouseX, mouseY, 5, 0, Math.PI * 2, false);
    ctx.fill();
     
    // 座標の表示テキストを描画
    var maxWidth = 100;
    ctx.textAlign = 'right';
    ctx.fillText('( ' + mouseX + ', ' + mouseY + ' )', canvasW - 20, canvasH - 20, maxWidth);
    ctx.closePath();
    
    // 直線
    ctx.beginPath();
    ctx.strokeStyle = 'hsl( 0, 100%, 50% )';
    ctx.lineWidth = 5;
    ctx.moveTo(rootlist[0][0],rootlist[0][1]);
    for(var i=1;i<rootlist.length;i++) {
    ctx.lineTo(rootlist[i][0],rootlist[i][1]);
    }
    ctx.stroke();
    ctx.closePath();
  }
};
