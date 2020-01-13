"use strict";

function $(e) {
  return document.getElementById(e);
}

var urlParam = location.search.substring(1);
  if (urlParam) {
    var param = urlParam.split("&");
  }

function getQRID() {
  return param[0];
}

function getgID() {
  return param[1];
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
  for (var i = 0; i < lines.length; ++i) {
    var cells = lines[i].split(",");
    if (cells.length != 1) {
      csvData.push(cells);
    }
  }
  return csvData;
}

function QRID2index(QRID, QRdb) {
  for (var i = 0; i < QRdb.length; ++i) {
    if (QRdb[i][0] == QRID) {
      var index = i;
    }
  }
  return index;
}

function goal2index(goal, QRdb) {
  var index = -1;
  for (var i = 0; i < QRdb.length; ++i) {
    if (QRdb[i][4] == goal) {
      var index = i;
    }
  }
  return index;
}

var cur_QRID = getQRID();
var QRdb = csvToArray("database/qr_info.csv");
var canvasW = 900;
var canvasH = 600;

jQuery(function () {
  jQuery('#text1').autocomplete({
    source: function (request, response) {
      var suggests = [];
      var regexp = new RegExp('(' + request.term + ')');

      jQuery.each(QRdb, function (i, values) {
        if (values[4].match(regexp)) {
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


window.onload = function () {

  // 現在地取得
 if (param.Length==1){
  var cur_QRID = getQRID();
  var QRdb = csvToArray("database/qr_info.csv");
  var cur_QRindex = Number(cur_QRID) - 1;
  var cur_x = QRdb[cur_QRindex][1];
  var cur_y = QRdb[cur_QRindex][2];

  // 設定
  var canvas = document.getElementById('axisCanvas');
  canvas.width = canvasW;
  canvas.height = canvasH;
  var image = new Image();
  let imagePath = "database/HonkanMap_1F.svg";
  image.src = imagePath;
  var ctx = canvas.getContext('2d');

  //地図表示
  image.onload = function () {
    ctx.drawImage(image, 0, 0, canvasW, canvasH);
    //現在地表示
    ctx.beginPath();
    ctx.fillStyle = 'hsl( 0, 100%, 50% )';
    ctx.arc(cur_x * canvasW, cur_y * canvasH, 10, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  };
 }

 if (param.Length==2){
  var cur_QRID = getQRID();
  var gindex = getgID();
  var QRdb = csvToArray("database/qr_info.csv");
  var cur_QRindex = Number(cur_QRID) - 1;
  var cur_x = QRdb[cur_QRindex][1];
  var cur_y = QRdb[cur_QRindex][2];
  const graph = genTestGraph();
  const shortestPath = dijkstra(cur_QRindex, gindex, graph);

  // 設定
  var canvas = document.getElementById('axisCanvas');
  canvas.width = canvasW;
  canvas.height = canvasH;
  var image = new Image();
  let imagePath = "database/HonkanMap_1F.svg";
  image.src = imagePath;
  var ctx = canvas.getContext('2d');

  //地図表示
  ctx.clearRect(0, 0, canvasW, canvasH);
    image.onload = function () {
      ctx.drawImage(image, 0, 0, canvasW, canvasH);
      ctx.beginPath();
      ctx.fillStyle = 'hsl( 0, 100%, 50% )';
      ctx.arc(QRdb[cur_QRindex][1] * canvasW, QRdb[cur_QRindex][2] * canvasH, 10, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.strokeStyle = 'hsl( 0, 100%, 50% )';
      ctx.lineWidth = 5;
      ctx.moveTo(QRdb[shortestPath[0]][1] * canvasW, QRdb[shortestPath[0]][2] * canvasH);
      for (var i = 1; i < shortestPath.length; i++) {
        ctx.lineTo(QRdb[shortestPath[i]][1] * canvasW, QRdb[shortestPath[i]][2] * canvasH);
      }
      ctx.stroke();
      ctx.closePath();
    }
 }

  canvas.onclick = function (e) {

    ctx.clearRect(0, 0, canvasW, canvasH);

    var rect = e.target.getBoundingClientRect();
    var mouseX = e.clientX - Math.floor(rect.left) - 2;
    var mouseY = e.clientY - Math.floor(rect.top) - 2;

    // 座標の表示テキストを描画
    ctx.beginPath();
    ctx.drawImage(image, 0, 0, canvasW, canvasH);
    ctx.fillStyle = 'hsl( 0, 100%, 50% )';
    ctx.arc(cur_x * canvasW, cur_y * canvasH, 10, 0, Math.PI * 2, false);
    ctx.fill();
    var maxWidth = 100;
    ctx.textAlign = 'right';
    ctx.fillText('( ' + mouseX + ', ' + mouseY + ' )', canvasW - 20, canvasH - 20, maxWidth);
    // ctx.fillText('( ' + cur_x + ', ' + cur_y + ' )', 100, canvasH - 20, maxWidth);
    ctx.closePath();
  }
};


function kensaku(param) {
  var goal = document.getElementById("text1").value;
  var gindex = goal2index(goal, QRdb);
  document.getElementById("text2").innerText = gindex;
  if (gindex == -1) {
    document.getElementById("text2").innerText = "正しい目的地を選択して下さい";
  }
  else {
    //hyouji
    var canvas = document.getElementById('axisCanvas');
    var ctx = canvas.getContext('2d');
    var cur_QRID = getQRID();
    var cur_QRindex = Number(cur_QRID) - 1;

    // root
    const graph = genTestGraph();
    const shortestPath = dijkstra(cur_QRindex, gindex, graph);
    console.log('shortestPath: [' + shortestPath + ']');

    ctx.clearRect(0, 0, canvasW, canvasH);
    var image = new Image();
    let imagePath = "database/HonkanMap_1F.svg";
    image.src = imagePath;
    image.onload = function () {
      ctx.drawImage(image, 0, 0, canvasW, canvasH);
      ctx.beginPath();
      ctx.fillStyle = 'hsl( 0, 100%, 50% )';
      ctx.arc(QRdb[cur_QRindex][1] * canvasW, QRdb[cur_QRindex][2] * canvasH, 10, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.strokeStyle = 'hsl( 0, 100%, 50% )';
      ctx.lineWidth = 5;
      ctx.moveTo(QRdb[shortestPath[0]][1] * canvasW, QRdb[shortestPath[0]][2] * canvasH);
      for (var i = 1; i < shortestPath.length; i++) {
        ctx.lineTo(QRdb[shortestPath[i]][1] * canvasW, QRdb[shortestPath[i]][2] * canvasH);
      }
      //ctx.moveTo(QRdb[cur_QRindex][1] * canvasW, QRdb[cur_QRindex][2] * canvasH);
      //ctx.lineTo(QRdb[gindex][1] * canvasW, QRdb[gindex][2] * canvasH);

      ctx.stroke();
      ctx.closePath();
    };
    param[1] = gindex;
  }
  return param;
}

function hoge(code) {
  //エンターキー押したら
  if (13 === code) {
    kensaku();
  }
}