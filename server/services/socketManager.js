const { io } = require('../index');
const { PING_PONG, UPDATE_GRID } = require('../../constants');

module.exports = (socket) => {
  socket.on(UPDATE_GRID, (obj) => {
    io.emit(UPDATE_GRID, obj);
  });

  socket.on(PING_PONG, () => {});
};
