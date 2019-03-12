const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT = 11;
const SECRET = 'a big nice secret';

const compare = async (password, user) => {

  const isAuthenticated = await bcrypt.compare(password, user.password_digest);
  return isAuthenticated;
}

const hash = async (password) => {
  return await bcrypt.hash(password, SALT);
}

const encode = (data) => {
  return jwt.sign(data, SECRET);
}

const verify = (token) => {
  return jwt.verify(token, SECRET);
}


const restrict = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const data = verify(token);
    res.locals.user = data;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send('Invalid Creds');
  }
}
module.exports = {
  compare,
  hash,
  encode,
  verify,
  restrict,
};
