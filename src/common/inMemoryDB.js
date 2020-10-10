const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const db = {
  Users: [],
  Boards: [],
  Tasks: [],
  fixUsersStructure: user => {
    if (user) {
      db.Tasks.filter(task => task).forEach(task => {
        task.userId = task.userId === user.id ? null : task.userId;
      });
    }
  },
  fixBoardsStructure: board => {
    if (board) {
      db.Tasks.filter(task => task && task.boardId === board.id).forEach(
        task => (db.Tasks[db.Tasks.indexOf(task)] = undefined)
      );
    }
  },
  fixTasksStructure: () => {}
};

(() => {
  for (let i = 0; i < 3; i++) {
    db.Users.push(new User());
  }
  const board = new Board();
  const user = new User();
  db.Users.push(user);
  db.Boards.push(board);
  db.Tasks.push(new Task({ boardId: board.id, userId: user.id }));
  db.Tasks.push(new Task({ boardId: board.id }));
})();

const getAllEntities = tableName => {
  return db[tableName].filter(entity => entity);
};

const getEntity = (tableName, id) => {
  const entities = db[tableName]
    .filter(entity => entity)
    .filter(entity => entity.id === id);

  if (entities.length > 1) {
    console.error(
      `The DB data is damaged. Table ${tableName}. Entity ID: ${id}`
    );
    throw new Error('DB problems');
  }

  return entities[0];
};

const updateEntity = async (tableName, id, entity) => {
  const oldEntity = getEntity(tableName, id);
  if (oldEntity) {
    db[tableName][db[tableName].indexOf(oldEntity)] = { ...entity };
  }

  return getEntity(tableName, id);
};

const saveEntity = (tableName, entity) => {
  db[tableName].push(entity);

  return getEntity(tableName, entity.id);
};

const removeEntity = (tableName, id) => {
  const entity = getEntity(tableName, id);

  if (entity) {
    db[`fix${tableName}Structure`](entity);
    const index = db[tableName].indexOf(entity);
    db[tableName] = [
      ...db[tableName].slice(0, index),
      ...(db[tableName].length > index + 1
        ? db[tableName].slice(index + 1)
        : [])
    ];
  }
  return entity;
};

module.exports = {
  getAllEntities,
  getEntity,
  removeEntity,
  saveEntity,
  updateEntity
};
