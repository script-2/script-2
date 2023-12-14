onmessage = function (e) {
  // eslint-disable-next-line no-eval
  let result = eval(`${e.data}`);
  postMessage(result);
};
