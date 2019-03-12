const { Router } = require('express');
const { 
  verify,
  restrict,
} = require('../auth');
const squirrelsRouter = Router();

const squirrels = [
  'Chip',
  'Rocky',
  'Alvin'
];

squirrelsRouter.get('/', (req, res) => {
  const data = res.locals.user;
  res.json({ squirrels, data });
});

module.exports = squirrelsRouter;
