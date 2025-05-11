function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

window.onload = () => {
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const bg = getParam("bg") || "A";
  const bgImg = new Image();
  bgImg.src = `assets/${bg}_BG.png`;

  bgImg.onload = () => {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  };

  const clock = document.getElementById("clock");

  function updateClock() {
    const now = new Date();
    let timeStr = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");

    if (getParam("showSec") === "1") {
      timeStr += ":" + now.getSeconds().toString().padStart(2, "0");
    }

    let dateStr = "";
    if (getParam("showDate") === "1") {
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const date = now.getDate().toString().padStart(2, "0");
      const weekday = ["日", "月", "火", "水", "木", "金", "土"][now.getDay()];

      if (getParam("showYear") === "1") dateStr += `${year}/`;
      dateStr += `${month}/${date}`;

      if (getParam("showWeekday") === "1") dateStr += ` (${weekday})`;
    }

    clock.innerHTML = `<div style="font-size:${getParam("timeFontSize") || 48}px;">${timeStr}</div>
                       <div style="font-size:${getParam("dateFontSize") || 24}px;">${dateStr}</div>`;
  }

  updateClock();
  setInterval(updateClock, 1000);
};
