const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;

  switch (statusCode) {
    case constants.NOT_FOUND:
      res.json({
        status: "Not Found",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.VALIDATION_ERROR:
      res.json({
        status: "Validation Failed",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        status: "Unauthorized",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        status: "Forbidden",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        status: "Server error",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;

    default:
      break;
  }
};
module.exports = errorHandler;
