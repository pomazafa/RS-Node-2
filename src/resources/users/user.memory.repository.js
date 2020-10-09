const db = require('../../common/inMemoryDB');
const TABLE_NAME = 'Users';

const getAll = async () => {
  return db.getAllEntities(TABLE_NAME);
};

module.exports = { getAll };
