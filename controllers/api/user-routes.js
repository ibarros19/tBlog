const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  const { session, body } = req

  try {
    const created = await User.create({
      username: body.username,
      password: body.password
    })
    session.save(() => {
      session.userId = created.id;
      session.username = created.username;
      session.loggedIn = true;
  
      res.json(created);
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  const { body, session } = req

  try {
    const user = await User.findOne({
      where: {
        username: body.username
      }
    })
    if (!user) {
      res.status(404).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = user.checkPassword(body.password);

    if (!validPassword) {
      res.status(403).json({ message: 'Incorrect password!' });
      return;
    }

    session.save(() => {
      session.userId = user.id;
      session.username = user.username;
      session.loggedIn = true;
      
      user.password = null

      res.json({ user, message: 'You are now logged in!' });
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  const { session } = req
  if (session.loggedIn) {
    session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

module.exports = router;