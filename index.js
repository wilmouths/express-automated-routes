const path = require('path');

const RoutesLoader = require('./loaders/routes');
const MiddlewaresLoader = require('./loaders/middlewares');

const folders = new Map();
folders.set('routes', path.resolve(__dirname, 'routes'));
folders.set('middlewares', path.resolve(__dirname, 'middlewares'));

const loadRoutes = (app) => {
  const loader = new RoutesLoader(folders.get('routes'));
  return loader.load(app);
};

const loadMiddlewares = (app) => {
  const loader = new MiddlewaresLoader(folders.get('middlewares'));
  return loader.load(app);
};

module.exports = (app) => {
  if (app.get('routes')) {
    folders.set('routes', app.get('routes'));
  }
  loadRoutes(app);

  if (app.get('middlewares')) {
    folders.set('middlewares', app.get('middlewares'));
  }
  loadMiddlewares(app);
};
