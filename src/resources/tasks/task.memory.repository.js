const db = require('../../common/inMemoryDB');
const TABLE_NAME = 'Tasks';
const Task = require('./task.model');

const getAll = async () => {
  return db.getAllEntities(TABLE_NAME);
};

const get = async id => {
  const task = await db.getEntity(TABLE_NAME, id);
  if (!task) {
    console.error(`Task Not found: id=${id}`);
    return;
  }
  return task;
};

const remove = async id => {
  if (!(await db.removeEntity(TABLE_NAME, id))) {
    throw new Error(`Error while removing ${id} task`);
  }
};

const save = async task => {
  return db.saveEntity(TABLE_NAME, new Task(task));
};

const update = async (id, task) => {
  const entity = await db.updateEntity(TABLE_NAME, id, task);

  if (!entity) {
    throw new Error(`Error while updating ${id} task`);
  }

  return entity;
};

module.exports = { getAll, get, remove, save, update };
