![https://travis-ci.org/wilmouths/express-automated-routes](https://travis-ci.org/wilmouths/express-automated-routes.svg?branch=master)

# express-automated-routes

**express-automated-routes** is an [express](https://github.com/expressjs/express) middleware that allows you to create routes easily without declaring them.

You probably ask yourself the question of how the routes are made, the answer is simple, this middleware is based on the architecture of the folders.

---

## Install

```
npm install express-automated-routes --save`
```
---

## Usage

```js
const express = require('express');
const path = require('path');
const expressAutomatedRoutes = require('express-automated-routes');

const app = express();

app.set('middlewares', path.resolve(__dirname, 'middlewares')); // optional, default folder is ./middlewares
app.set('routes', path.resolve(__dirname, 'routes')); // optional, default folder is ./routes
app.use(expressAutomatedRoutes(app));

app.listen(8080, () => {
  console.log('Listening on http://localhost:8080');
});
```

---

### How to add routes
To add roads, you need to create a roads folder at the root of your project, this middleware will be based on the architecture of this folder, e.g.

```
routes /
  - index.js
  - blog /
    - index.js
    - _id /
      - index.js
      - edit.js
```

The routes obtained are as follows :

```
/
/blog
/blog/:id
/blog/:id/edit
```
> HTTP request methods are the usual ones

The HTTPS methods are the functions of the route file, e.g.

```js
exports.get = (req, res) => {});
exports.post = (req, res) => {});
exports.patch = (req, res) => {});
exports.delete = (req, res) => {});
exports.update = (req, res) => {});
...
```

---

### How to add middleware on route
To add a middleware to a route, you have to make a slight change in the function, which is as follows.

Your function will become an object with 2 elements, **middlewares which is an array** and **handler which will be your route function**. e.g.

```js
exports.get = {
  middlewares: [
    (req, res, next) => {
      res.statusCode = 418;
      next();
    },
  ],
  handler: (req, res) => res.json({
    method: req.method,
    status: res.statusCode,
    data: 'I\'am a teapot !',
  }),
};
```
---

### How to add global middleware
To add global middleware to the application you can use the express method :

```js
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err);
});
```

Or you can create files in the middlewares folder and they will be loaded automatically.
To define a middleware folder you have to proceed as follows :

```js
app.set('middlewares', path.resolve(__dirname, 'middlewares'));
```
