const { performance } = require('perf_hooks');

const TIME_TAKEN_BY_SINGLE_OPERATION_MILLISECOND = 20;
const NO_OPERATIONS_IN_LONG_TASK = 200;

const blockMainThreadUntil = time => {
  while (performance.now() < time);
};

const performNOperation = N =>
  blockMainThreadUntil(
    performance.now() + N * TIME_TAKEN_BY_SINGLE_OPERATION_MILLISECOND
  );

const delay = timeout =>
  new Promise(res => {
    setTimeout(res, timeout);
  });

module.exports = {
  performNOperation,
  delay,
  NO_OPERATIONS_IN_LONG_TASK
};
