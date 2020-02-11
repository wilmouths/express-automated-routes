exports.isAdmin = (req, res, next) => res.status(401).end('Your are not an Administrator');
