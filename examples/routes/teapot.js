exports.get = {
  middlewares: [
    (req, res, next) => {
      res.statusCode = 418;
      next();
    },
  ],
  handler: (req, res) => res.json({
    method: req.method,
    status: res.statusCode,
    data: 'I\'am a teapot !',
  }),
};
