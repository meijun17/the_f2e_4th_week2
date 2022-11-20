$(".tab").on("click", () => {
  $(".tab").toggleClass("active");
});

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://mozilla.github.io/pdf.js/build/pdf.worker.js";

const canvas = document.querySelector("#writing-canvas");
const ctx = canvas.getContext("2d");
const clearBtn = document.querySelector("#clear-btn");
const createBtn = document.querySelector("#create-btn");
let signList = [];

// 確認滑鼠 / 手指是否按下
let isPainting = false;

// 下2行設定線條的相關數值
ctx.lineWidth = 4;
ctx.lineCap = "round";

// 取得滑鼠 / 手指在畫布上的位置
function getPaintPosition(e) {
  const canvasSize = canvas.getBoundingClientRect();
  if (e.type === "mousemove") {
    return {
      x: e.clientX - canvasSize.left,
      y: e.clientY - canvasSize.top,
    };
  } else {
    return {
      x: e.touches[0].clientX - canvasSize.left,
      y: e.touches[0].clientY - canvasSize.top,
    };
  }
}

// 開始繪圖時，將狀態開啟
function startPosition(e) {
  e.preventDefault();
  isPainting = true;
}

// 結束繪圖時，將狀態關閉，並產生新路徑
function finishedPosition() {
  isPainting = false;
  ctx.beginPath();
}

// 繪圖過程
function draw(e) {
  e.preventDefault();
  if (!isPainting) return;

  // 取得滑鼠 / 手指位置
  const paintPosition = getPaintPosition(e);

  // 移動到滑鼠位置並產生圖案
  ctx.lineTo(paintPosition.x, paintPosition.y);
  ctx.stroke();
}

// 重新設定畫布
function reset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 儲存圖片
function createImage() {
  let newImg = canvas.toDataURL("image/png");
  if (!isSignPDF) {
    localStorage.setItem("signList", newImg);
    window.location.href = "signPDF.html";
  } else {
    getSignList(newImg);
  }
}

// event listener 電腦板
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", finishedPosition);
canvas.addEventListener("mouseleave", finishedPosition);
canvas.addEventListener("mousemove", draw);

// event listener 手機板
canvas.addEventListener("touchstart", startPosition);
canvas.addEventListener("touchend", finishedPosition);
canvas.addEventListener("touchcancel", finishedPosition);
canvas.addEventListener("touchmove", draw);

// 重設按鈕
clearBtn.addEventListener("click", reset);
createBtn.addEventListener("click", createImage);

// 選擇畫筆顏色
$(".color-blue,.color-red,.color-black").click(function () {
  $(this).parent().find(".color").removeClass("active");
  $(this).addClass("active");
  let chooseColor = $(this)[0].classList.value;
  if (chooseColor.includes("blue")) {
    ctx.fillStyle = "#0014C7";
    ctx.strokeStyle = "#0014C7";
  } else if (chooseColor.includes("red")) {
    ctx.fillStyle = "#ca0000";
    ctx.strokeStyle = "#ca0000";
  } else {
    ctx.fillStyle = "#000000";
    ctx.strokeStyle = "#000000";
  }
});
