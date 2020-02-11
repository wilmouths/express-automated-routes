const userMiddleware = require('../middlewares/user');

exports.get = {
  middlewares: userMiddleware.isAdmin,
  handler: (req, res) => res.json({
    method: req.method,
    status: res.statusCode,
    data: 'This is Admin page',
  }),
};
