const db = require('../../common/inMemoryDB');
const TABLE_NAME = 'Users';
const User = require('./user.model');

const getAll = async () => {
  return db.getAllEntities(TABLE_NAME);
};

const get = async id => {
  const user = await db.getEntity(TABLE_NAME, id);
  if (!user) {
    throw new Error(`User Not found: id=${id}`);
  }
  return user;
};

const remove = async id => {
  if (!(await db.removeEntity(TABLE_NAME, id))) {
    throw new Error(`Error while removing ${id} user`);
  }
};

const save = async user => {
  return db.saveEntity(TABLE_NAME, new User(user));
};

const update = async (id, user) => {
  const entity = await db.updateEntity(TABLE_NAME, id, user);

  if (!entity) {
    throw new Error(`Error while updating ${id} user`);
  }

  return entity;
};

module.exports = { getAll, get, remove, save, update };
