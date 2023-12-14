"use strict";
(() => {
  // src/workers/webWorkerSaysHello.js
  onmessage = function(e) {
    let result = eval(`${e.data}`);
    postMessage(result);
  };
})();
