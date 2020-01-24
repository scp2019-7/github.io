var video = document.getElementById("video");
var canvasElement = document.getElementById("canvas");
var canvas = canvasElement.getContext("2d");
var outputMessage = document.getElementById("outputMessage");

function successCallback(stream) {
  video.srcObject = stream;
  requestAnimationFrame(tick);
};

function toggleQR() {
  if ($("video").style.display == "block") {
    $("video").style.display = "none";
    video.srcObject.getTracks()[0].stop();
    $("qr_button").value = "QR読み込み";
    $("div_map").style.display = "";
  }
  else {
    $("video").style.display = "block";
    navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: { exact: "environment" } } })
      .then(successCallback)
      .catch(() =>
        navigator.mediaDevices.getUserMedia({ audio: false, video: true })
          .then(successCallback)
          .catch(err => alert(err))
      );
    $("qr_button").value = "地図に戻る";
    $("div_map").style.display = "none";
  }
}

function tick() {
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });
    outputMessage.innerText = code ? code.data : "";
    if (code) {
      if (code.data.includes("https://scp2019-7.github.io/index.html?")) {
        location.search = '?' + code.data.split('?')[1] + '&' + getgoalID();
        return;
      }
    }
  }
  requestAnimationFrame(tick);
}