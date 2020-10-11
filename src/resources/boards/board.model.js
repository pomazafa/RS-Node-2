const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'BOARD',
    columns = [],
    description = 'Board'
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.columns = columns;
  }

  static toResponse(board) {
    return board;
  }
}

module.exports = Board;
