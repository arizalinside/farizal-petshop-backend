const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
};

module.exports = loggerMiddleware;