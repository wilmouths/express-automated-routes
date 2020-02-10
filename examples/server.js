const express = require('express');
const path = require('path');
const expressAutomatedRoutes = require('../index');

const app = express();

app.set('middlewares', path.resolve(__dirname, 'middlewares'));
app.set('routes', path.resolve(__dirname, 'routes'));
app.use(expressAutomatedRoutes(app));

app.listen(8080, () => {
  console.log('Listening on http://localhost:8080');
});

module.exports = app;
