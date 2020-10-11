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
    res.json({ id, login, name });
  });
router
  .route('/:id')
  .get(async (req, res) => {
    const id = req.params.id;
    res.json(await usersService.get(id));
  })
  .put(async (req, res) => {
    const id = req.params.id;
    res.json(await usersService.update(id, req.body));
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    res.json(await usersService.remove(id));
  });

module.exports = router;
