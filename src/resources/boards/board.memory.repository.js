const db = require('../../common/inMemoryDB');
const TABLE_NAME = 'Boards';
const Board = require('./board.model');

const getAll = async () => {
  return db.getAllEntities(TABLE_NAME);
};

const get = async id => {
  const board = await db.getEntity(TABLE_NAME, id);
  if (!board) {
    console.error(`Board Not found: id=${id}`);
    return;
  }
  return board;
};

const remove = async id => {
  if (!(await db.removeEntity(TABLE_NAME, id))) {
    throw new Error(`Error while removing ${id} board`);
  }
};

const save = async board => {
  return db.saveEntity(TABLE_NAME, new Board(board));
};

const update = async (id, board) => {
  const entity = await db.updateEntity(TABLE_NAME, id, board);

  if (!entity) {
    console.error(`Board Not found: id=${id}`);
    return;
  }
  return entity;
};

module.exports = { getAll, get, remove, save, update };
