const { StatusCodes } = require("http-status-codes");
class APIError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const errorHandler = (err, req, res, next) => {


  if (err instanceof APIError)
    return res
      .status(StatusCodes.OK)
      .json({ status: err.code, data: err.message });

  if (err instanceof Error)
    return res
      .status(StatusCodes.OK)
      .json({ status: err.code, data: err.message });

  return res
    .status(StatusCodes.OK)
    .json({ status: StatusCodes.INTERNAL_SERVER_ERROR, data: err.message });
};

module.exports = { errorHandler, APIError };
