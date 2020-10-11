const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();
const get = id => tasksRepo.get(id);
const update = (id, task) => tasksRepo.update(id, task);
const remove = id => tasksRepo.remove(id);
const save = task => tasksRepo.save(task);

module.exports = { getAll, get, update, remove, save };
