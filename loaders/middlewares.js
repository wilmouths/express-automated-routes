const fs = require('fs');
const path = require('path');
const Loader = require('.');

module.exports = class Middlewares extends Loader {
  load(app) {
    const middlewaresFiles = fs.readdirSync(this.path);

    if (middlewaresFiles) {
      middlewaresFiles.forEach((middleware) => {
        try {
          app.use(require(path.resolve(this.path, middleware)));
        } catch (error) {
          console.error('[ERROR][ExpressAutomatedRoutes]', error);
        }
      });
    }
  }
};
