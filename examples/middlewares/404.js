module.exports = (req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = 'Not found';
  next(err);
};
