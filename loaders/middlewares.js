const fs = require('fs');
const path = require('path');
const Loader = require('.');

module.exports = class Middlewares extends Loader {
  load(app) {
    const middlewaresFiles = fs.readdirSync(this.path);

    if (middlewaresFiles) {
      middlewaresFiles.forEach((middleware) => {
        const middlewarePath = path.resolve(this.path, middleware);
        if (this.isFile(middlewarePath)) {
          try {
            app.use(require(middlewarePath));
          } catch (error) {
            console.error('[ERROR][ExpressAutomatedRoutes]', error);
          }
        }
      });
    }
  }

  isFile(filePath) {
    return fs.statSync(filePath).isFile();
  }
};
