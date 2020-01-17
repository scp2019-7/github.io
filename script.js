"use strict";

const canvasW = 900;
const canvasH = 600;
const QRdb = csvToArray("database/qr_info.csv");
let floor = 1;

function $(e) {
  return document.getElementById(e);
}

function getstartID() {
  var urlParam = location.search.substring(1);
  if (urlParam) {
    var param = urlParam.split("&");
  }
  if (param.length < 1) return -1;
  return param[0];
}

function getgoalID() {
  var urlParam = location.search.substring(1);
  if (urlParam) {
    var param = urlParam.split("&");
  }
  if (param.length < 2) return -1;
  return param[1];
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

function goal2index(goal, QRdb) {
  var index = -1;
  for (var i = 0; i < QRdb.length; ++i) {
    if (QRdb[i][5] == goal) {
      var index = i;
    }
  }
  return index;
}

jQuery(function () {
  jQuery('#text1').autocomplete({
    source: function (request, response) {
      var suggests = [];
      var regexp = new RegExp('(' + request.term + ')');

      jQuery.each(QRdb, function (i, values) {
        if (values[5].match(regexp)) {
          suggests.push(values[5]);
        }
      });

      response(suggests);
    },
    autoFocus: true,
    delay: 300,
    minLength: 1
  });
});

function drawMap() {
  let image = new Image();
  image.src = "database/HonkanMap_" + floor + "F.svg";

  image.onload = () => {
    let canvas = $('axisCanvas');
    let ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = "destination-over";
    ctx.drawImage(image, 0, 0, canvasW, canvasH);
  }
}

function drawCurrentPosition(cur_x, cur_y) {
  let canvas = $('axisCanvas');
  let ctx = canvas.getContext('2d');
  ctx.globalCompositeOperation = "source-over";
  ctx.beginPath();
  ctx.fillStyle = 'hsl( 0, 100%, 50% )';
  ctx.arc(cur_x * canvasW, cur_y * canvasH, 10, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
}

function drawPath(shortestPath) {
  let canvas = $('axisCanvas');
  let ctx = canvas.getContext('2d');
  ctx.globalCompositeOperation = "source-over";
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

function drawClikedPosition(e) {
  let canvas = $('axisCanvas');
  let ctx = canvas.getContext('2d');
  ctx.globalCompositeOperation = "source-over";
  const rect = e.target.getBoundingClientRect();
  const mouseX = e.clientX - Math.floor(rect.left) - 2;
  const mouseY = e.clientY - Math.floor(rect.top) - 2;

  // 座標の表示テキストを描画
  ctx.beginPath();
  var maxWidth = 100;
  ctx.textAlign = 'right';
  ctx.fillText('( ' + mouseX + ', ' + mouseY + ' )', canvasW - 20, canvasH - 20, maxWidth);
  ctx.closePath();
}


window.onload = draw;
function draw() {
  let canvas = $('axisCanvas');
  let ctx = canvas.getContext('2d');

  canvas.width = canvasW;
  canvas.height = canvasH;

  // 現在地取得
  const cur_QRID = getstartID();
  const cur_QRindex = Number(cur_QRID);
  const cur_x = QRdb[cur_QRindex][1];
  const cur_y = QRdb[cur_QRindex][2];

  drawMap();
  drawCurrentPosition(cur_x, cur_y);

  const goalID = getgoalID();
  if (goalID != -1) {
    const graph = genTestGraph();
    const shortestPath = dijkstra(cur_QRindex, Number(goalID), graph);
    console.log('shortestPath: [' + shortestPath + ']');

    drawPath(shortestPath);
  }

  canvas.onclick = function (e) {
    ctx.clearRect(0, 0, canvasW, canvasH);
    draw();
    drawClikedPosition(e);
  }
};


function kensaku() {
  var goal = $("text1").value;
  var gindex = goal2index(goal, QRdb);
  $("text2").innerText = gindex;
  if (gindex == -1)
    $("text2").innerText = "正しい目的地を選択して下さい";
  else
    location.search = "?" + getstartID() + '&' + gindex;
}

function hoge(code) {
  //エンターキー押したら
  if (13 === code) {
    kensaku(param);
  }
}

function changeFloor(f) {
  floor = f;
  draw();
}