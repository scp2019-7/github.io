let video = document.getElementById("video");
let canvasElement = document.getElementById("axisCanvas");
let canvas = canvasElement.getContext("2d");
let outputMessage = document.getElementById("outputMessage");

let show_video = false;

function successCallback(stream) {
  video.srcObject = stream;
  requestAnimationFrame(tick);
};

function toggleQR() {
  if (show_video) {
    show_video = false;
    video.srcObject.getTracks()[0].stop();
    $("qr_button").value = "QR読み込み";
    draw();
  }
  else {
    show_video = true;
    navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: { exact: "environment" } } })
      .then(successCallback)
      .catch(() =>
        navigator.mediaDevices.getUserMedia({ audio: false, video: true })
          .then(successCallback)
          .catch(err => alert(err))
      );
    $("qr_button").value = "地図に戻る";
  }
}

function tick() {
  if (!show_video) return;
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });
    outputMessage.innerText = code ? code.data : "No QR code detected.";
    if (code) {
      if (!code.data.includes("https://scp2019-7.github.io/index.html?")) return;
      location.search = '?' + code.data.split('?')[1] + '&' + getgoalID();
    }
  }
  requestAnimationFrame(tick);
}