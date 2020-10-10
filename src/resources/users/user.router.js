const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const { id, login, name } = await usersService.save(req.body);
    res.send({ id, login, name });
  })
  .put(async (req, res) => {});

module.exports = router;
