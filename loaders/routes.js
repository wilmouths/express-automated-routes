const fs = require('fs');
const path = require('path');
const Loader = require('.');

module.exports = class Routes extends Loader {
  load(app) {
    const routesFiles = this.getRoutesFiles(this.path);

    const routes = new Map();

    routesFiles.forEach((routeFile) => {
      let fileName = path.basename(routeFile, '.js');
      if (fileName.indexOf('_') === 0) {
        fileName = fileName.replace('_', ':');
      }
      if (fileName === 'index') {
        fileName = '';
      }

      let folderName = path.dirname(routeFile).replace(this.path, '').replace(/\\/g, '/');
      if (folderName.indexOf('_')) {
        folderName = folderName.replace('_', ':');
      }
      routes.set(`${folderName}/${fileName}`, require(routeFile));
    });

    routes.forEach((methods, route) => {
      Object.keys(methods).forEach((method) => {
        const routeObject = routes.get(route)[method];
        if (typeof routeObject === 'function') {
          app[method](route, routeObject);
        }

        if (typeof routeObject === 'object') {
          app[method](route, routeObject.middlewares, routeObject.handler);
        }
      });
    });
  }

  isDirectory(directoryPath) {
    return fs.statSync(directoryPath).isDirectory();
  }

  isFile(filePath) {
    return fs.statSync(filePath).isFile();
  }

  getFiles(filePath) {
    return fs.readdirSync(filePath)
      .map((name) => path.join(filePath, name))
      .filter(this.isFile);
  }

  getDirectories(directoryPath) {
    return fs.readdirSync(directoryPath)
      .map((name) => path.join(directoryPath, name))
      .filter(this.isDirectory);
  }

  getRoutesFiles(routesDirectory) {
    const dirs = this.getDirectories(routesDirectory);
    const files = dirs.map((dir) => this.getRoutesFiles(dir)).reduce((a, b) => a.concat(b), []);
    return files.concat(this.getFiles(routesDirectory));
  }
};
