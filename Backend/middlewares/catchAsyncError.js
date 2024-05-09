

const catchAsyncError = (externalFunction) => (req, res, next) => {
    Promise.resolve(externalFunction(req, res, next)).catch(next);
  }

module.exports = catchAsyncError;