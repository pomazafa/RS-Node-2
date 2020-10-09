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

// ещё методы типа ремув и тд

module.exports = { getAllEntities, getEntity };
