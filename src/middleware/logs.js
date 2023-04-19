const logsRequest = (req, res, next) => {
  console.log("log path", req.path);
  next();
};

module.exports = { logsRequest };
