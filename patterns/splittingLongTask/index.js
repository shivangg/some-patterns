const {
  performNOperation,
  delay,
  NO_OPERATIONS_IN_LONG_TASK,
} = require('./utils');

let continueLogging = true;

const logEvery50ms = () => {
  setTimeout(() => {
    console.log('Main thread got free to handle other stuff');
    continueLogging && logEvery50ms();
  }, 500);
};

const naiveCompletion = () => performNOperation(NO_OPERATIONS_IN_LONG_TASK);

const splitingLongTaskIntoSmallerChunks = () => {
  const performChunkedTask = (chunkSize, pos = 0) => {
    setTimeout(() => {
      performNOperation(chunkSize);
    });

    if (NO_OPERATIONS_IN_LONG_TASK > pos + chunkSize) {
      setTimeout(() => {
        performChunkedTask(chunkSize, pos + chunkSize);
      });
    } else {
      console.log('Chunked task complete');
      continueLogging = false;
    }
  };

  performChunkedTask(3);
};

(async () => {
  logEvery50ms();

  console.log('Starting execution by naive implementation...');
  naiveCompletion();
  console.log('Completed by naive implementation...');
  continueLogging = false;

  await delay(5000);
  console.log('\n\n\n');

  continueLogging = true;
  logEvery50ms();

  console.log('Starting execution by chunking implementation...');
  splitingLongTaskIntoSmallerChunks();
})();
