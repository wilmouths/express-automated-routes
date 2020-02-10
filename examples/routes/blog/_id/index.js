exports.get = (req, res) => res.json({
  method: req.method,
  article: {
    id: req.params.id,
    author: 'John Doe',
    title: 'This ans express middleware to make automated routes',
    content: 'Visit the following link to see this middleware : https://github.com/wilmouths/express-automated-routes/',
    createdAt: new Date(),
  },
});
