exports.patch = (req, res) => res.status(200).json({
  method: req.method,
  articleID: req.params.id,
  data: req.query,
});
