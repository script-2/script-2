"use strict";
(() => {
  // src/canvasAPI/drawLine.ts
  function drawLine(x1, y1, x2, y2, setPixel2) {
    let steep = false;
    if (Math.abs(x1 - x2) < Math.abs(y1 - y2)) {
      [x1, y1] = [y1, x1];
      [x2, y2] = [y2, x2];
      steep = true;
    }
    if (x1 > x2) {
      [x1, x2] = [x2, x1];
      [y1, y2] = [y2, y1];
    }
    const dx = x2 - x1;
    const dy = y2 - y1;
    const derror = Math.abs(dy) * 2;
    let error = 0;
    let y = y1;
    for (let x = x1; x <= x2; x++) {
      if (steep) {
        setPixel2(y, x);
      } else {
        setPixel2(x, y);
      }
      error += derror;
      if (error > dx) {
        if (y2 > y1) {
          y++;
        } else {
          y--;
        }
        error -= dx * 2;
      }
    }
  }

  // src/workers/drawRandomBitmap.ts
  onmessage = function(event) {
    let { width, height, code } = event.data;
    let offscreen = new OffscreenCanvas(width, height);
    let ctx = offscreen.getContext("2d");
    if (ctx) {
      function setPixel(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        clampedArray[y * width * 4 + x * 4 + 0] = 0;
        clampedArray[y * width * 4 + x * 4 + 1] = 0;
        clampedArray[y * width * 4 + x * 4 + 2] = 0;
        clampedArray[y * width * 4 + x * 4 + 3] = 255;
      }
      let arrayBuffer = new ArrayBuffer(width * height * 4);
      let clampedArray = new Uint8ClampedArray(arrayBuffer);
      {
        function line(x1, y1, x2, y2) {
          drawLine(x1, y1, x2, y2, setPixel);
        }
        eval(code);
        line(0, 0, 0, 0);
      }
      postMessage(clampedArray, [clampedArray.buffer]);
    }
  };
})();
