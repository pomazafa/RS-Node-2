const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router
  .route('/')
  .get(async (req, res) => {
    const tasks = await tasksService.getAll();
    res.json(tasks.map(Task.toResponse));
  })
  .post(async (req, res) => {
    const boardId = req.params.boardId;
    if (boardId) {
      req.body.boardId = boardId;
    }
    const task = await tasksService.save(req.body);
    res.json(task);
  });
router
  .route('/:id')
  .get(async (req, res) => {
    const id = req.params.id;
    res.json(await tasksService.get(id));
  })
  .put(async (req, res) => {
    const id = req.params.id;
    res.json(await tasksService.update(id, req.body));
  });

module.exports = router;
