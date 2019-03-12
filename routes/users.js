const { Router } = require('express');
const { User } = require('../models');
const { 
  hash,
  compare,
  encode,
  verify,
} = require('../auth');

const usersRouter = Router();

usersRouter.post('/login', async (req, res) => {
  try {
    // extract data from req body
    const { email, password } = req.body;

    // check to see if email is valid
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (user !== null) {
      // compare submitted pw with digest
      const authenticated = await compare(password, user);
      console.log(authenticated);
      if (authenticated === true) {
        return res.json({
          user: {
            email: user.email,
            id: user.id,
            created_at: user.created_at,
            updated_at: user.updated_at
          }
        });
      }
    }
    return  res.status(401).send('Invalid Credentials');
  } catch (e) {
    console.log(e);
    res.status(401).send('Invalid Credentials');
  }
})

usersRouter.post('/', async (req, res) => {
  try {
    // extract data from req body
    const { password, email } = req.body;

    // hash the password
    const password_digest = await hash(password);

    // call User.create
    const user = await User.create({
      email,
      password_digest
    });

    const userData = {
      email: user.email,
      id: user.id,
      created_at: user.created_at,
      updated_at: user.updated_at,
    } 
    const token = encode(userData);
    // respond with new user data
    res.json( {
      token,
      user: userData    });

  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

module.exports = usersRouter;
