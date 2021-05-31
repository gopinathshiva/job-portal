export const errorHandler = (e) => {
  console.log(e);
}

export const delayExecution = (cb) => {
  setTimeout(() => {
    cb();
  }, 1000);
}
