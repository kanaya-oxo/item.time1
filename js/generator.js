function generateURL() {
  const bg = document.querySelector('input[name="bg"]:checked').value;
  const showSec = document.getElementById("showSec").checked ? 1 : 0;
  const showDate = document.getElementById("showDate").checked ? 1 : 0;
  const showYear = document.getElementById("showYear").checked ? 1 : 0;
  const showWeekday = document.getElementById("showWeekday").checked ? 1 : 0;
  const timeFontSize = document.getElementById("timeFontSize").value;
  const dateFontSize = document.getElementById("dateFontSize").value;
  const fontColor = document.getElementById("fontColor").value;
  const lineColor1 = document.getElementById("lineColor1").value;
  const lineColor2 = document.getElementById("lineColor2").value;
  const fillColor1 = document.getElementById("fillColor1").value;
  const fillColor2 = document.getElementById("fillColor2").value;
  const topOffset = document.getElementById("topOffset").value;

  const params = new URLSearchParams({
    bg, showSec, showDate, showYear, showWeekday,
    timeFontSize, dateFontSize, fontColor,
    lineColor1, lineColor2, fillColor1, fillColor2, topOffset
  });

  const url = `${location.origin}/index.html?${params.toString()}`;
  navigator.clipboard.writeText(url);
  alert("URLをコピーしました！");
}

function updatePreview() {
  const canvas = document.getElementById("previewCanvas");
  const ctx = canvas.getContext("2d");

  const bg = document.querySelector('input[name="bg"]:checked').value;
  const bgImg = new Image();
  bgImg.src = `assets/${bg}_BG.png`;

  bgImg.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  };

  const previewClock = document.getElementById("previewClock");
  const timeFontSize = document.getElementById("timeFontSize").value;
  const dateFontSize = document.getElementById("dateFontSize").value;
  const fontColor = document.getElementById("fontColor").value;

  const now = new Date();
  const timeStr = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");
  const dateStr = (now.getMonth() + 1).toString().padStart(2, "0") + "/" + now.getDate().toString().padStart(2, "0");

  previewClock.innerHTML = `<div style="font-size:${timeFontSize}px;color:${fontColor};">${timeStr}</div>
                            <div style="font-size:${dateFontSize}px;color:${fontColor};">${dateStr}</div>`;
}

document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", updatePreview);
});

window.onload = updatePreview;
