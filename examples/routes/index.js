exports.get = (req, res) => res.json({
  method: req.method,
  status: res.statusCode,
  data: 'This is the homepage',
});
