exports.get = (req, res) => res.json({
  method: req.method,
  status: res.statusCode,
  params: req.params,
});
