const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).send({ error: 'Missing token' });
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, role, email }
    next();
  } catch (err) { return res.status(401).send({ error: 'Invalid token' }); }
};

const permit = (...allowedRoles) => (req, res, next) => {
  if (!req.user) return res.status(401).end();
  if (allowedRoles.includes(req.user.role)) return next();
  return res.status(403).send({ error: 'Forbidden' });
};

module.exports = { auth, permit };
