const errorHandler = (err, req, res, next) => {
  console.log(err.statusCode, "status error code");
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
