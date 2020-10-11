const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
// const taskRouter = require('../boards/board.router');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })
  .post(async (req, res) => {
    const board = await boardsService.save(req.body);
    res.json(board);
  });
router
  .route('/:id')
  .get(async (req, res) => {
    const id = req.params.id;
    const result = await boardsService.get(id);
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  })
  .put(async (req, res) => {
    const id = req.params.id;
    res.json(await boardsService.update(id, req.body));
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    res.json(await boardsService.remove(id));
  });

module.exports = router;
